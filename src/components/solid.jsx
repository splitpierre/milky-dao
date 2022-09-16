import { createSignal, createResource } from "solid-js";
// import { render } from "solid-js/web";

const fetchUser = async (id) =>
  (await fetch(`https://swapi.dev/api/people/${id}/`)).json();
const fetchTest = async () =>
  (await fetch("http://localhost:3000/api/users", {
    headers:{

      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjYzMzI5MTExLCJleHAiOjE2NjM1MDE5MTF9.S8Jzm8lefM973qJXpQ4t7j_FhW1hA0m6IM9n8qabZhU"
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
