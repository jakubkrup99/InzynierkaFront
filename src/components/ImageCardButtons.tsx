interface ImageCardButtonsProps {
  onDelete: (imageId: string) => void;
  onUpdate: (imageId: string) => void;
  imageId: string;
  isRegeneratePending: boolean;
}

function ImageCardButtons({
  onDelete,
  onUpdate,
  imageId,
  isRegeneratePending,
}: ImageCardButtonsProps) {
  return (
    <div className="px-6 pb-6 flex justify-between">
      <button
        onClick={() => onDelete(imageId)}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        Delete
      </button>
      <button
        onClick={() => onUpdate(imageId)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        {isRegeneratePending ? "Generating..." : "Regenerate"}
      </button>
    </div>
  );
}

export default ImageCardButtons;
