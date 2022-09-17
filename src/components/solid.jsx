import { createSignal, createResource } from "solid-js";
// import { render } from "solid-js/web";

const fetchUser = async (id) =>
  (await fetch(`https://swapi.dev/api/people/${id}/`)).json();
const fetchTest = async () =>
  (await fetch("http://209.50.55.75:3000/api/users", {
    headers:{

      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjYzNDI1NTk4LCJleHAiOjE2NjM1OTgzOTh9.yhp2a8aaa2OGzeX1Dne6bI4P3_utIc3Z115RW8YFE10"
    }
  })).json();

const SolidAPI = () => {
  const [userId, setUserId] = createSignal();
  const [user] = createResource(userId, fetchTest);

  return (
    <>
      <input
        style="color:black"
        type="text"
        min="1"
        placeholder="Type something"
        onInput={(e) => setUserId(e.currentTarget.value)}
      />
      <span>{user.loading && "Loading..."}</span>
      <div>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </>
  );
};

// render(SolidAPI, document.getElementById("app"));
export default SolidAPI;
