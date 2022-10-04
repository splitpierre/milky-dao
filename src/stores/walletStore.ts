import { atom, map, action } from "nanostores";
import { persistentAtom, persistentMap } from "nanostores-persistent-solid";
import { STORE_API } from "./global";
import { Buffer } from "buffer";
export const voterAddr = atom({ value: "init" });
export const bearStore = atom({ value: 0 });
export const walletSelected = persistentAtom("wallet", "");
export const newUserNonce = persistentAtom("nonce", "");

type TheUser = {
  address: string;
  authToken?: string;
  id?: string;
  name?: string;
  apiKey?: string;
  createdAt?: string;
};

export const storeUser = persistentMap("user", <TheUser>{});

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

// export const walletConnect = async () => {
//   // @ts-ignore
//   let walletApi = await window.cardano.nami.enable();
//   let addr = await walletApi.getUsedAddresses();
//   voterAddr.set({ value: addr[0] });
//   console.log(await walletApi.getUsedAddresses());
// };

export const walletDisconnect = async () => {
  console.log("issue disconnect", storeUser.get().address);
  walletSelected.set("");
  newUserNonce.set("");
  storeUser.set(<TheUser>{});
  console.log("issued disconnect", storeUser.get().address);
};

export const getWalletUser = async () => {
  const selectedWallet = walletSelected.get();
  storeUser.set({ address: selectedWallet });
};

export const walletEnable = async (wallet) => {
  // @ts-ignore
  let walletApi = await window.cardano[wallet].enable();
  let addr = await walletApi.getUsedAddresses();
  const addrBuff = Buffer.from(addr[0], "hex");
  // @ts-ignore
  const plain_address = window.MilkyDaoCardano.Address.from_bytes(
    addrBuff,
    "hex"
  ).to_bech32();
  console.log("fetch plain address", plain_address);
  walletSelected.set(wallet);
  storeUser.set({ address: plain_address });
  // console.log({ plain_address });
};

export const walletRegister = async () => {
  // @ts-ignore
  let walletApi = await window.cardano[walletSelected.get()].enable();
  const addr = storeUser.get().address;
  const nonce = newUserNonce.get();

  let rawAddr = await walletApi.getUsedAddresses();
  walletApi
    .signData(rawAddr[0], toHex(nonce))
    .then(async (sign_result) => {
      console.log("signed to register", {
        sign_result,
        to: typeof sign_result,
      });
      let signature: any = sign_result;
      const bodyData = {
        address: addr,
        nonce: nonce,
        ...(typeof signature === "string" && {
          signature: signature,
        }),
        ...(typeof signature === "object" && {
          signature: {
            ...sign_result,
          },
        }),
      };
      const registerUser = await (
        await fetch(`${STORE_API.api_url}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        })
      ).json();

      console.log("fetch for registerUser", registerUser);
      storeUser.set({ address: addr });
      newUserNonce.set("");

      // const fetchUser = await (
      //   await fetch(`${STORE_API.api_url}/auth/profile`, {
      //     headers: {
      //       Authorization: `Bearer ${fetchAuthToken.access_token}`,
      //     },
      //   })
      // ).json();

      // storeUser.set({
      //   authToken: fetchAuthToken.access_token,
      //   address: addr,
      //   id: fetchUser.id,
      // });
      // console.log("got user profile", fetchUser);
    })
    .catch((error) => console.log("catch err", error));
};
export const walletLogin = async () => {
  // @ts-ignore
  let walletApi = await window.cardano[walletSelected.get()].enable();
  const addr = storeUser.get().address;
  console.log("walletLogin addr", addr);
  let nonce: any = await (
    await fetch(`${STORE_API.api_url}/auth/nonce?address=${addr}`)
  ).text();
  if (isJsonString(nonce)) {
    console.error("User NOT FOUND");
    nonce = await (await fetch(`${STORE_API.api_url}/auth/nonce`)).text();
    newUserNonce.set(nonce);
    return null;
  }
  console.log("got nonce", nonce);

  let rawAddr = await walletApi.getUsedAddresses();
  walletApi
    .signData(rawAddr[0], toHex(nonce))
    .then(async (sign_result) => {
      console.log("signed", sign_result);
      const bodyData = {
        address: addr,
        signature: sign_result,
        nonce: nonce,
      };
      const fetchAuthToken = await (
        await fetch(`${STORE_API.api_url}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        })
      ).json();

      console.log("fetch for login", fetchAuthToken);

      const fetchUser = await (
        await fetch(`${STORE_API.api_url}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${fetchAuthToken.access_token}`,
          },
        })
      ).json();

      storeUser.set({
        authToken: fetchAuthToken.access_token,
        address: addr,
        id: fetchUser.id,
        createdAt: fetchUser.createdAt,
        apiKey: fetchUser.apiKey,
      });
      console.log("got user profile", fetchUser);
      newUserNonce.set("");
    })
    .catch((error) => console.log("catch err", error));
};

export function toHex(str) {
  const arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
