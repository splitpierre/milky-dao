export default function TailButton(props) {
  return (
    <button
      id={props.id}
      class={`items-center btn rounded-md gap-3 bg-orange-700
       text-gray-100 hover:bg-orange-100  px-3 py-1 w-48 h-12 ${props.class}`}
      type={props.type}
      aria-label={props.label}
      onClick={() => props.onClick()}
    >
      {props.icon}
      {"  "}
      {props.label}
    </button>
  );
}
