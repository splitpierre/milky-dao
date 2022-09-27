// import { createSignal, createResource } from "solid-js";
import { useStore } from "nanostores-persistent-solid";
import { persistedAddr } from "../stores/walletStore";

export default function ProfilePage() {
  const persisted_addr = useStore(persistedAddr);
  return (
    <>
      <div>
        <span>persisted addr: {persisted_addr()}</span>
      </div>
    </>
  );
}
