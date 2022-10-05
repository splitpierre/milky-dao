import { atom, map, action } from "nanostores";
import { STORE_API } from "./global";

export const projectListResponse = atom({});

export const fetchProjectList = action(
  projectListResponse,
  "fetchProjectList",
  async (store) => {
    store.set({
      value: await (await fetch(`${STORE_API.api_url}/projects/all`)).json(),
    });
  }
);
