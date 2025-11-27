interface PageSizeButtonProps {
  size: number;
  onClick?: () => void;
}

function PageSizeButton({ size, onClick }: PageSizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 min-w-12 p-2 rounded-lg text-white"
    >
      {size}
    </button>
  );
}

export default PageSizeButton;
