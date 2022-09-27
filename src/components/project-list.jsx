// import { createSignal, createResource } from "solid-js";
import { useStore } from "nanostores-persistent-solid";
import { fetchProjectList, projectListResponse } from "../stores/projectStore";

export default function ProjectList() {
  const projects = useStore(projectListResponse);
  fetchProjectList();

  return (
    <>
      {/* {JSON.stringify(projects())} */}
      {projects() && projects().value && (
        <>
          {projects().value.map(
            ({
              title,
              iconImage,
              shortDescription,
              proposals,
              votes_count,
            }) => (
              <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <div class="flex flex-col items-center pb-10">
                  <img
                    class="mb-3 w-24 h-24 rounded-full shadow-lg"
                    src={iconImage}
                    alt={title}
                  />
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white text-center h-16">
                    {title}
                  </h5>
                  <h5 class="text-sm text-gray-500 dark:text-gray-400 p-3 h-24">
                    {shortDescription}
                  </h5>
                </div>
                <div class="p-4 border-t text-xs text-white-700 columns-2">
                  <div class="justify-center items-center text-center">
                    <dd class="font-light text-gray-500 dark:text-gray-400">
                      Proposals
                    </dd>
                    <dt class="mb-1 text-2xl font-bold">{proposals.length}</dt>
                  </div>
                  <div class="justify-center items-center text-center">
                    <dd class="font-light text-gray-500 dark:text-gray-400">
                      Votes
                    </dd>
                    <dt class="mb-1 text-2xl font-bold">{votes_count}</dt>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
}
