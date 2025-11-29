interface ImageDescriptionProps {
  title: string;
  azureDescription: string;
  trainedModelDescription: string;
}

function ImageDescription({
  title,
  azureDescription,
  trainedModelDescription,
}: ImageDescriptionProps) {
  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 text-base">
        <b>Azure description:</b> {azureDescription}
      </p>
      <p className="text-gray-600 text-base">
        <b>My description:</b> {trainedModelDescription}
      </p>
    </div>
  );
}

export default ImageDescription;
