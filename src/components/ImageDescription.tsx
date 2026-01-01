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
    </div>
  );
}

export default ImageDescription;
