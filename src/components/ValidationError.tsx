import { BiError } from "react-icons/bi";

type ValidationErrorProps = {
  text: string;
};
function ValidationError({ text }: ValidationErrorProps) {
  return (
    <div className="flex justify-start bg-red-400 dark:bg-red-500 items-center px-2 py-3 rounded-md my-4 gap-2">
      <BiError size={24} />
      <div>{text}</div>
    </div>
  );
}

export default ValidationError;
