interface ImageTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown: () => void;
}

export function ImageTitleInput({
  value,
  onChange,
  onKeyDown,
  placeholder = "Title",
}: ImageTitleInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onKeyDown();
        }
      }}
      type="text"
      placeholder={placeholder}
      className="w-92 text-black border-2 rounded-lg p-3 m-2 bg-gray-100 focus:ring-2 focus:ring-blue-500 border-blue-500 outline-none placeholder:text-gray-500"
    />
  );
}
