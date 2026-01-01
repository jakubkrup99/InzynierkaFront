import ImageDescriptionParagraph from "./ImageDescriptionParagraph";

interface ImageDescriptionProps {
  title: string;
  azureDescription: string;
  trainedModelDescription: string;
  isAzureCaptionError: boolean;
  isModelCaptionError: boolean;
  isRegenerating: boolean;
  imageId: string;
  onUpdate: (imageId: string) => void;
}

function ImageDescription({
  title,
  azureDescription,
  trainedModelDescription,
  isAzureCaptionError,
  isModelCaptionError,
  isRegenerating,
  imageId,
  onUpdate,
}: ImageDescriptionProps) {
  const azureDescriptionTitle = "Azure description: ";
  const azureError = "Failed to generate description by azure service.";
  const modelDescriptionTitle = "My description:";
  const modelError = "Failed to generate description by trained model.";

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2 text-gray-800">
        <b>Title: </b>
        {title}
      </h2>
      <ImageDescriptionParagraph
        isError={isAzureCaptionError}
        errorMessage={azureError}
        description={azureDescription}
        descriptionTitle={azureDescriptionTitle}
      />
      <ImageDescriptionParagraph
        isError={isModelCaptionError}
        errorMessage={modelError}
        description={trainedModelDescription}
        descriptionTitle={modelDescriptionTitle}
      />
      <button
        onClick={() => onUpdate(imageId)}
        className="flex mt-4 items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        {isRegenerating ? "Generating..." : "Regenerate"}
      </button>
    </div>
  );
}

export default ImageDescription;
