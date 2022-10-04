// import { createSignal, createResource } from "solid-js";
import { useStore } from "nanostores-persistent-solid";
import { newUserNonce, storeUser, walletSelected } from "../stores/walletStore";

export default function ProfilePage() {
  const user = useStore(storeUser);
  const wallet = useStore(walletSelected);
  const nonce = useStore(newUserNonce);
  return (
    <>
      <div>
        <span>wallet: {wallet()}</span>
        <br />
        <span>addr: {user().address}</span>
        <br />
        <span>id: {user().id}</span>
        <br />
        <span>auth: {user().authToken}</span>
        <br />
        <span>nonce: {nonce()}</span>
        <br />
        <span>apiKey: {user().apiKey}</span>
        <br />
        <span>createdAt: {user().createdAt}</span>
        <br />
        <span>roles: {user().roles}</span>
        <br />
      </div>
    </>
  );
}
