import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import type CreateImageRequest from "../types/API/CreateImageRequest";
import { addImage } from "../client/images";
import { validateFile } from "../Utils/validationUtil";
import toast from "react-hot-toast";
import RoundDeleteButton from "./Buttons/RoundDeleteButton";
import Button from "./Buttons/Button";
import ImageDescription from "./ImageDescription";

interface ImageState {
  isAdded: boolean;
  isCaption: boolean;
  azureCaption: string;
  modelCaption: string;
  url: string;
  title: string;
  file: File | null;
}

function ImageForm() {
  const [error, setError] = useState<string | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    isAdded: false,
    isCaption: false,
    azureCaption: "",
    modelCaption: "",
    url: "",
    title: "",
    file: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: (image: CreateImageRequest) => addImage(image),
    onError: () => {
      toast.error("Image upload failed.");
    },
    onSuccess: (res: any) => {
      toast.success("Your image has been added.");
      console.log(res, "res");
      setImageState({
        ...imageState,
        isAdded: true,
        isCaption: true,
        azureCaption: res.azureDescription,
        modelCaption: res.modelDescription,
      });
    },
  });
  function handleButtonClick() {
    setError(null);
    fileInputRef.current?.click();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    setImageState({
      ...imageState,
      isAdded: true,
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  }

  function handleTitleChange(e: any) {
    setImageState({ ...imageState, title: e.target.value });
  }
  async function handleGenerateCaption({ file, title }: CreateImageRequest) {
    const error = validateFile(file);
    if (error) {
      setError(error);
    }
    await mutation.mutateAsync({ file, title });
  }
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-6 mt-32 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Caption this image...
          </h1>
          {imageState.isAdded && (
            <RoundDeleteButton
              onClick={() =>
                setImageState({
                  isAdded: false,
                  url: "",
                  title: "",
                  isCaption: false,
                  file: null,
                  azureCaption: "",
                  modelCaption: "",
                })
              }
            />
          )}
        </div>
        {imageState.isAdded ? (
          <div>
            <div className="flex justify-center">
              <img
                src={imageState.url}
                className="h-92 w-92"
                alt="Image that you have just added"
              />
            </div>
            <div className="flex items-center flex-col ">
              {imageState.isAdded && !imageState.isCaption && (
                <>
                  <input
                    value={imageState.title}
                    onChange={handleTitleChange}
                    type="text"
                    placeholder="Title"
                    className="w-92 border-2 rounded-lg p-3 m-2 bg-gray-400 focus:ring-2 focus:ring-blue-500 border-blue-500 outline-none placeholder:text-gray-700 text-black"
                  />
                  <Button
                    width={92}
                    onClick={() =>
                      handleGenerateCaption({
                        file: imageState.file!,
                        title: imageState.title,
                      })
                    }
                  >
                    {mutation.isPending ? "Generating..." : "Generate caption"}
                  </Button>
                </>
              )}
              {imageState.isAdded && imageState.isCaption && (
                <ImageDescription
                  title={imageState.title}
                  azureDescription={imageState.azureCaption}
                  trainedModelDescription={imageState.modelCaption}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="relative  border-2 border-dashed hover:border-orange-500 border-gray-300 rounded-lg p-12 text-center bg-white">
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
                {error}
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageForm;
