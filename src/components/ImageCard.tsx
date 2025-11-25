interface ImageCardProps {
  azureDescription: string;
  trainedModelDescription: string;
  imageUrl: string;
}

function ImageCard({
  azureDescription,
  trainedModelDescription,
  imageUrl,
}: ImageCardProps) {
  return (
    <div className="max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full object-contain bg-gray-100"
        src={imageUrl}
        alt={azureDescription}
      />
      <div className="p-6">
        {/* <h2 className="font-bold text-xl mb-2 text-gray-800">Nice Photo</h2> */}
        <p className="text-gray-600 text-base">
          <b>Azure description:</b> {azureDescription}
        </p>
        <p className="text-gray-600 text-base">
          <b>My description:</b> {trainedModelDescription}
        </p>
      </div>
      <div className="px-6 pb-6">
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ImageCard;
