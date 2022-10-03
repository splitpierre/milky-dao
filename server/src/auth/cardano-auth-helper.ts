import {
  BigNum,
  COSEKey,
  COSESign1,
  HeaderMap,
  Int,
  Label,
} from '@emurgo/cardano-message-signing-nodejs';
import {
  Address,
  BaseAddress,
  Ed25519Signature,
  PublicKey,
  RewardAddress,
  StakeCredential,
} from '@emurgo/cardano-serialization-lib-nodejs';

/*
 * Signature Object Verification
 */
export class SignedData {
  payload: any;
  signature: Ed25519Signature;
  data: any;
  headers: { algorithmId: any; address: any; publicKey: PublicKey };
  constructor(signed: any) {
    // CIP 30 VERIFY
    if (typeof signed === 'object') {
      const signature_buffer: any = Buffer.from(signed.signature, 'hex');
      const cose_buffer = Buffer.from(signature_buffer, 'hex');
      const message: COSESign1 = COSESign1.from_bytes(cose_buffer);
      const header_map: HeaderMap = message
        .headers()
        .protected()
        .deserialized_headers();

      const coseKey: any = COSEKey.from_bytes(Buffer.from(signed.key, 'hex'));
      const publicKey = PublicKey.from_bytes(
        coseKey
          .header(Label.new_int(Int.new_negative(BigNum.from_str('2'))))
          .as_bytes(),
      );
      this.headers = {
        algorithmId: header_map.algorithm_id()!.as_int()!.as_i32(),
        address: Address.from_bytes(
          header_map.header(Label.new_text('address'))!.as_bytes()!,
        ),
        publicKey: publicKey,
      };
      this.signature = Ed25519Signature.from_bytes(message.signature());
      this.data = message.signed_data().to_bytes();
      this.payload = message.signed_data().payload();
    } else {
      // CIP 0008 VERIFY
      const signed_buffer: any = Buffer.from(signed, 'hex');
      const cose_buffer = Buffer.from(signed_buffer, 'hex');
      const message: COSESign1 = COSESign1.from_bytes(cose_buffer);
      const header_map: HeaderMap = message
        .headers()
        .protected()
        .deserialized_headers();
      this.headers = {
        algorithmId: header_map.algorithm_id()!.as_int()!.as_i32(),
        address: Address.from_bytes(
          header_map.header(Label.new_text('address'))!.as_bytes()!,
        ),
        publicKey: PublicKey.from_bytes(header_map.key_id()!),
      };
      this.payload = message.payload();
      this.signature = Ed25519Signature.from_bytes(message.signature());
      this.data = message.signed_data().to_bytes();
      // console.log("SignedData constructor", {
      //     pk: PublicKey.from_bytes(header_map.key_id()!).to_bech32(),
      //     pl: this.payload,
      //     sg: this.signature,
      // })
    }
  }

  verify(address: any, payload: any) {
    if (!this.verifyPayload(payload)) {
      // throw new Error('Payload does not match');
      console.log('Payload does not match');
      return false;
    }
    if (!this.verifyAddress(address)) {
      console.log('Could not verify because of address mismatch');
      // throw new Error('Could not verify because of address mismatch');
      return false;
    }
    return this.headers.publicKey.verify(this.data, this.signature);
  }

  verifyPayload(payload: any) {
    // return Buffer.from(this.payload, 'hex').compare(Buffer.from(payload, 'hex'));
    // console.log('SignedData verifyPayload', Buffer.from(this.payload, 'hex').equals(Buffer.from(payload, 'utf8')))
    // return Buffer.from(this.payload, 'hex').equals(Buffer.from(payload, 'utf8'))
    const hexMessage = Buffer.from(this.payload);
    const stringMessage = hexMessage.toString('utf-8');
    // console.log("verifyPayload", stringMessage === payload)
    return stringMessage === payload;
  }

  verifyAddress(address: any) {
    try {
      const checkAddress = Address.from_bech32(address);
      // console.log('verify addr', checkAddress);
      if (this.headers.address.to_bech32() !== checkAddress.to_bech32()) {
        // console.log('FASLE1');
        return false;
      }
      // check if BaseAddress
      try {
        const baseAddress = BaseAddress.from_address(this.headers.address);
        //reconstruct address
        const paymentKeyHash = this.headers.publicKey.hash();
        const stakeKeyHash: any = baseAddress!.stake_cred().to_keyhash();
        const reconstructedAddress: any = BaseAddress.new(
          checkAddress.network_id(),
          StakeCredential.from_keyhash(paymentKeyHash),
          StakeCredential.from_keyhash(stakeKeyHash),
        );
        return (
          checkAddress.to_bech32() ===
          reconstructedAddress.to_address().to_bech32()
        );
      } catch (e) {
        console.log('Catch on verify', e);
      }

      try {
        const stakeKeyHash = this.headers.address.hash();
        const reconstructedAddress = RewardAddress.new(
          checkAddress.network_id(),
          StakeCredential.from_keyhash(stakeKeyHash),
        );
        return (
          checkAddress.to_bech32() ===
          reconstructedAddress.to_address().to_bech32()
        );
      } catch (e) {}
      // console.log("verifyAddress", checkAddress)

      return false;
    } catch (e) {}
  }
}

export type CardanoSignature = {
  signature: string;
  key: string;
  nonce: string;
};
