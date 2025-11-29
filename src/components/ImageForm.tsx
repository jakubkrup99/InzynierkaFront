import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type CreateImageRequest from "../types/API/CreateImageRequest";
import { addImage } from "../client/images";
import { validateFile } from "../Utils/validationUtil";
import toast from "react-hot-toast";
import RoundDeleteButton from "./Buttons/RoundDeleteButton";
import ImageDescription from "./ImageDescription";
import ImageDropZone from "./ImageDropZone";
import { ImagePreview } from "./ImagePreview";
import { CaptionGeneratorForm } from "./CaptionGeneratorForm";
import { ErrorMessage } from "./ErrorMessage";
import useDragAndDrop from "../hooks/useDragAndDrop";
import useImageUpload from "../hooks/useImageUpload";

export default function ImageForm() {
  const [error, setError] = useState<string | null>(null);
  const { imageState, setImage, setTitle, setCaptions, resetImage } =
    useImageUpload();

  const mutation = useMutation({
    mutationFn: (image: CreateImageRequest) => addImage(image),
    onError: () => {
      toast.error("Image upload failed.");
    },
    onSuccess: (res: any) => {
      toast.success("Your image has been added.");
      setError(null);
      setCaptions(res.azureDescription, res.modelDescription);
    },
  });

  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDragAndDrop(setImage);

  const handleGenerateCaption = async () => {
    const fileError = validateFile(imageState.file!);
    if (fileError) {
      setError(fileError);
      return;
    }
    if (imageState.title === "") {
      setError("Title can't be empty!");
      return;
    }

    setError(null);
    await mutation.mutateAsync({
      file: imageState.file!,
      title: imageState.title,
    });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-6 mt-32 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Caption this image...
          </h1>
          {imageState.isAdded && <RoundDeleteButton onClick={resetImage} />}
        </div>

        {imageState.isAdded ? (
          <div>
            <ImagePreview url={imageState.url} />

            {!imageState.isCaption ? (
              <CaptionGeneratorForm
                title={imageState.title}
                onTitleChange={setTitle}
                onGenerate={handleGenerateCaption}
                isGenerating={mutation.isPending}
              />
            ) : (
              <ImageDescription
                title={imageState.title}
                azureDescription={imageState.azureCaption}
                trainedModelDescription={imageState.modelCaption}
              />
            )}
          </div>
        ) : (
          <ImageDropZone
            isDragging={isDragging}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={setImage}
          />
        )}

        <ErrorMessage message={error} />
      </div>
    </div>
  );
}
