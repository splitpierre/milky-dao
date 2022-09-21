import {
  fetchSample,
  walletConnect,
  walletConnectPersist,
} from "../stores/walletStore";

export default function ConnectButton() {
  return (
    <>
      <button
        type="button"
        id="open-connect-button"
        class="inline-flex btn rounded-md text-sm p-2 font-bold"
        aria-label="Connect"
        onClick={walletConnectPersist}
      >
        Connect
      </button>
      <button
        type="button"
        id="open-connect-button"
        class="inline-flex btn rounded-md text-sm p-2 font-bold"
        aria-label="Connect"
        onClick={fetchSample}
      >
        Sample Ftch
      </button>
    </>
  );
}
