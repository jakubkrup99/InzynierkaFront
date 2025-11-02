import type { IconType } from "react-icons";

type InputProps = {
  Icon: IconType;
  name: string;
  placeholder?: string;
};

function Input({ Icon, name, placeholder }: InputProps) {
  return (
    <label
      htmlFor={name}
      className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-3 py-3 rounded-md gap-2 cursor-text mb-2"
    >
      <Icon size={20} />
      <input
        className="flex-1 bg-transparent outline-none"
        id={name}
        type={name}
        name={name}
        placeholder={placeholder ?? ""}
        required
      />
    </label>
  );
}

export default Input;
