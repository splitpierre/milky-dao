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
          {projects().value.map(({ title, iconImage, shortDescription }) => (
            <div>
              {title}
              <img src={iconImage} alt="{title}" />
              {shortDescription}
            </div>
          ))}
        </>
      )}
    </>
  );
}
