interface PageSizeButtonProps {
  size: number;
}

function PageSizeButton({ size }: PageSizeButtonProps) {
  return (
    <button className="bg-blue-600 min-w-10 p-2 rounded-lg text-white">
      {size}
    </button>
  );
}

export default PageSizeButton;
