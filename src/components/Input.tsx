import type { IconType } from "react-icons";

type InputProps = {
  Icon: IconType;
  name: string;
  placeholder?: string;
  type: string;
};

function Input({ Icon, name, placeholder, type }: InputProps) {
  return (
    <label
      htmlFor={name}
      className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-3 py-3 rounded-md gap-2 cursor-text mb-2"
    >
      <Icon size={20} />
      <input
        className="flex-1 bg-transparent outline-none autofill:bg-transparent"
        id={name}
        type={type}
        name={name}
        placeholder={placeholder ?? ""}
        autoComplete="off"
        required
      />
    </label>
  );
}

export default Input;
