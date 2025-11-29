import { useState } from "react";

interface ImageState {
  isAdded: boolean;
  isCaption: boolean;
  azureCaption: string;
  modelCaption: string;
  url: string;
  title: string;
  file: File | null;
}

const initialImageState: ImageState = {
  isAdded: false,
  isCaption: false,
  azureCaption: "",
  modelCaption: "",
  url: "",
  title: "",
  file: null,
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

  const setCaptions = (azureCaption: string, modelCaption: string) => {
    setImageState({
      ...imageState,
      isCaption: true,
      azureCaption,
      modelCaption,
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
