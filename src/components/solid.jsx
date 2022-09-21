// import { createSignal, createResource } from "solid-js";
import { useStore } from "nanostores-persistent-solid";
import {
  persistedAddr,
  sampleResponse,
  voterAddr,
} from "../stores/walletStore";

export default function SolidAPI() {
  const sample = useStore(sampleResponse);
  const voter = useStore(voterAddr);
  const persisted_addr = useStore(persistedAddr);
  const staticValue = voterAddr.get();
  return (
    <>
      <input
        value={staticValue.value}
        style="color:black"
        type="text"
        min="1"
        placeholder="Type something"
        // onInput={(e) => setUserId(e.currentTarget.value)}
      />
      {/* <span>{user.loading && "Loading..."}</span> */}
      <div>
        <span>addr: {voter().value}</span>
        <br />
        <span>persisted addr: {persisted_addr()}</span>
      </div>
      <div>
        <pre>{JSON.stringify(sample(), null, 2)}</pre>
      </div>
    </>
  );
}
