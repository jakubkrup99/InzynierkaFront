import { useQuery } from "@tanstack/react-query";
import ImageCard from "../components/ImageCard";
import { GetImages } from "../client/images";

function ImagesPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images"],
    queryFn: () => GetImages({ pageNumber: 1, pageSize: 30 }),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || data === null) {
    return <div>Loading images failed...</div>;
  }

  if (!isLoading && !isError) {
    console.log(data);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-32">
      {data.items.map((image: any) => (
        <ImageCard description={image.azureDescription} imageUrl={image.url} />
      ))}
    </div>
  );
}

export default ImagesPage;
