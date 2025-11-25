import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type CreateImageRequest from "../types/API/CreateImageRequest";
import { addImage } from "../client/images";

function ImageForm() {
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (image: CreateImageRequest) => addImage(image),
    onError: (err: any) => setError(err.message),
  });
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Caption this image...
          </h1>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>English</option>
            <option>Polish</option>
          </select>
        </div>

        <div className="relative border-2 border-dashed hover:border-orange-500 border-gray-300 rounded-lg p-12 text-center bg-white">
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
            <button className="text-blue-600 hover:text-orange-600 font-medium">
              select one
            </button>
          </p>
          <p className="text-sm text-gray-400">
            JPG, JPEG, PNG, GIF, BMP files less than 4MB
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;
