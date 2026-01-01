interface ImageDescriptionParagraphProps {
  isError: boolean;
  errorMessage: string;
  description: string;
  descriptionTitle: string;
}

function ImageDescriptionParagraph({
  isError,
  descriptionTitle,
  errorMessage,
  description,
}: ImageDescriptionParagraphProps) {
  return (
    <p className={`${isError ? "text-red-600" : "text-gray-600"} text-base`}>
      <b className="text-gray-600">{descriptionTitle}</b>{" "}
      {isError ? errorMessage : description}
    </p>
  );
}

export default ImageDescriptionParagraph;
