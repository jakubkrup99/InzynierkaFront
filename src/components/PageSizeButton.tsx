interface PageSizeButtonProps {
  size: number;
  isSelected: boolean;
  onClick?: () => void;
}

function PageSizeButton({ size, onClick, isSelected }: PageSizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 min-w-12 p-2 rounded-lg text-white ${
        isSelected ? "border-2 border-red-500" : ""
      }`}
    >
      {size}
    </button>
  );
}

export default PageSizeButton;
