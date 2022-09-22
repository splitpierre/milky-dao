import { atom, map, action } from "nanostores";
import { persistentAtom } from "nanostores-persistent-solid";
import { STORE_API } from "./global";

export const voterAddr = atom({ value: "init" });
export const bearStore = atom({ value: 0 });
export const persistedAddr = persistentAtom("addr", "init2");

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

export const walletConnectPersist = async () => {
  // @ts-ignore
  let walletApi = await window.cardano.nami.enable();
  let addr = await walletApi.getUsedAddresses();
  persistedAddr.set(addr[0]);
  // console.log(await walletApi.getUsedAddresses());
};
