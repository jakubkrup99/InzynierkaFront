import ImageCardButtons from "./ImageCardButtons";
import ImageDescription from "./ImageDescription";

interface ImageCardProps {
  azureDescription: string;
  trainedModelDescription: string;
  isAzureCaptionError: boolean;
  isModelCaptionError: boolean;
  imageUrl: string;
  imageId: string;
  title: string;
  onDelete: (imageId: string) => void;
  onUpdate: (imageId: string) => void;
  isRegeneratePending: boolean;
}

function ImageCard({
  azureDescription,
  trainedModelDescription,
  isAzureCaptionError,
  isModelCaptionError,
  imageUrl,
  imageId,
  title,
  onDelete,
  onUpdate,
  isRegeneratePending,
}: ImageCardProps) {
  return (
    <div className="max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="h-92 w-full object-contain bg-gray-100"
        src={imageUrl}
        alt={azureDescription}
      />
      <ImageDescription
        title={title}
        azureDescription={azureDescription}
        trainedModelDescription={trainedModelDescription}
        isAzureCaptionError={isAzureCaptionError}
        isModelCaptionError={isModelCaptionError}
        isRegenerating={isRegeneratePending}
        imageId={imageId}
        onUpdate={onUpdate}
      />
      <ImageCardButtons
        onDelete={onDelete}
        onUpdate={onUpdate}
        imageId={imageId}
        isRegeneratePending={isRegeneratePending}
      />
    </div>
  );
}

export default ImageCard;
