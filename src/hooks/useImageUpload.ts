import { useState } from "react";

interface ImageState {
  isAdded: boolean;
  isCaption: boolean;
  azureCaption: string;
  modelCaption: string;
  url: string;
  title: string;
  file: File | null;
  isAzureCaptionError: boolean;
  isModelCaptionError: boolean;
  imageId: string;
}

const initialImageState: ImageState = {
  isAdded: false,
  isCaption: false,
  azureCaption: "",
  modelCaption: "",
  url: "",
  title: "",
  file: null,
  isAzureCaptionError: false,
  isModelCaptionError: false,
  imageId: "",
};

export default function useImageUpload() {
  const [imageState, setImageState] = useState<ImageState>(initialImageState);

  const setImage = (file: File) => {
    setImageState({
      ...imageState,
      isAdded: true,
      url: URL.createObjectURL(file),
      file: file,
    });
  };

  const setTitle = (title: string) => {
    setImageState({ ...imageState, title });
  };

  const setCaptions = (
    azureCaption: string,
    modelCaption: string,
    isAzureCaptionError: boolean,
    isModelCaptionError: boolean,
    imageId: string
  ) => {
    if (isAzureCaptionError) {
      azureCaption = "Failed to generate description by azure service.";
    }
    if (isModelCaptionError) {
      modelCaption = "Failed to generate description by trained model.";
    }
    setImageState({
      ...imageState,
      isCaption: true,
      azureCaption,
      modelCaption,
      isAzureCaptionError,
      isModelCaptionError,
      imageId,
    });
  };

  const resetImage = () => {
    setImageState(initialImageState);
  };

  return {
    imageState,
    setImage,
    setTitle,
    setCaptions,
    resetImage,
  };
}
