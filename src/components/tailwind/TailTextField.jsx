export default function TailTextField(props) {
  return (
    <div class="w-full px-3">
      {props.label && (
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          {props.label}
        </label>
      )}
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        disabled={props.hasOwnProperty("disabled") ? true : false}
      />
      {props.description && (
        <p class="text-gray-600 text-xs italic">{props.description}</p>
      )}
    </div>
  );
}
