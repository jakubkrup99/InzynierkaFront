import { useRef } from "react";

interface ImageDropZoneProps {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (file: File) => void;
}

export default function ImageDropZone({
  isDragging,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: ImageDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative border-2 border-dashed hover:border-orange-500 ${
        isDragging ? "border-orange-500" : "border-gray-300"
      } rounded-lg p-12 text-center bg-white transition-colors`}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp"
        onChange={handleChange}
      />

      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      <p className="text-gray-600 mb-2">
        Drop your image here, or{" "}
        <button
          className="text-blue-600 hover:text-orange-600 font-medium"
          onClick={handleButtonClick}
        >
          select one
        </button>
      </p>

      <p className="text-sm text-gray-400">
        JPG, JPEG, PNG, GIF, BMP files less than 4MB
      </p>
    </div>
  );
}
