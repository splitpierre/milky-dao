import { atom, map, action } from "nanostores";
import { persistentAtom } from "nanostores-persistent-solid";
import { STORE_API } from "./global";
import { Buffer } from "buffer";
export const voterAddr = atom({ value: "init" });
export const bearStore = atom({ value: 0 });
export const persistedAddr = persistentAtom("address", "");

export const increase = action(bearStore, "increase", (store) => {
  store.set({ value: store.get().value + 1 });
});

export const sampleResponse = atom({});

export const fetchSample = action(
  sampleResponse,
  "fetchSample",
  async (store) => {
    store.set({
      value: await (await fetch(`${STORE_API.api_url}/voters`)).json(),
    });
  }
);

export const walletConnect = async () => {
  // @ts-ignore
  let walletApi = await window.cardano.nami.enable();
  let addr = await walletApi.getUsedAddresses();
  voterAddr.set({ value: addr[0] });
  console.log(await walletApi.getUsedAddresses());
};

export const walletDisconnect = async () => {
  persistedAddr.set("");
};

export const walletConnectPersist = async () => {
  // @ts-ignore
  let walletApi = await window.cardano.nami.enable();
  let addr = await walletApi.getUsedAddresses();
  const addrBuff = Buffer.from(addr[0], "hex");
  // @ts-ignore
  const plain_address = window.MilkyDaoCardano.Address.from_bytes(
    addrBuff,
    "hex"
  ).to_bech32();
  persistedAddr.set(plain_address);
  // console.log(plain_address);
};
