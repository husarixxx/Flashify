import MainButton from "./MainButton";
function Form({ inputs, onSubmit, submitText }) {
  return (
    <form className="flex flex-col gap-10 px-4" onSubmit={onSubmit}>
      {inputs.map((input) => (
        <label
          key={input.id}
          className="flex flex-col text-gray-600 text-xs lg:text-sm relative group"
        >
          {input.label}
          <input
            type={input.type}
            value={input.value}
            onChange={(e) => input.onChange(e, input.id)}
            placeholder={input.type === "email" ? "example@gmail.com" : ""}
            className={`border-b-1 text-sm lg:text-lg border-purple-400 focus:outline-none focus:outline-1 py-1  px-1 text-gray-900 placeholder:text-gray-400 ${
              input.error ? "border-red-400" : ""
            }`}
          />
          <span
            className={`absolute w-[100%] origin-left scale-0 group-focus-within:scale-100 bg-purple-700  bottom-0 left-0 h-[2px] transition-transform duration-600 ease-out ${
              input.error ? "bg-red-700" : ""
            }`}
          ></span>
          <span className="absolute top-[50px] text-[10px] text-red-500 lg:top-[60px] lg:text-[11px]">
            {input.error}
          </span>
        </label>
      ))}

      <MainButton text={submitText} />
    </form>
  );
}

export default Form;
