interface ImagePreviewProps {
  url: string;
  alt?: string;
}

export function ImagePreview({
  url,
  alt = "Uploaded image",
}: ImagePreviewProps) {
  return (
    <div className="flex justify-center mb-4">
      <img src={url} className="max-h-96 max-w-full rounded-lg" alt={alt} />
    </div>
  );
}
