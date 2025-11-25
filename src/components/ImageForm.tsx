import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import type CreateImageRequest from "../types/API/CreateImageRequest";
import { addImage } from "../client/images";
import { validateFile } from "../Utils/validationUtil";

function ImageForm() {
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: (image: CreateImageRequest) => addImage(image),
    onError: (err: any) => setError(err.message),
    onSuccess: (res: any) => setDescription(res),
  });
  function handleButtonClick() {
    setError(null);
    fileInputRef.current?.click();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }
  async function handleFile(file: File) {
    const error = validateFile(file);
    if (error) {
      setError(error);
    }
    await mutation.mutateAsync({ file });
  }
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Caption this image...
          </h1>
          {/* TODO */}
          {/* <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>English</option>
            <option>Polish</option>
          </select> */}
        </div>

        <div className="relative border-2 border-dashed hover:border-orange-500 border-gray-300 rounded-lg p-12 text-center bg-white">
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
          <div className="mt-6">
            <label
              className={`block text-sm ${
                error ? "text-red-600" : "text-gray-600"
              } mb-2`}
            >
              {error ?? description}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;
