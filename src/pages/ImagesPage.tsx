import { useQuery } from "@tanstack/react-query";
import ImageCard from "../components/ImageCard";
import { GetImages } from "../client/images";
import PaginationFooter from "../components/PaginationFooter";
import { useState } from "react";

function ImagesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images", currentPage, pageSize],
    queryFn: () => GetImages({ pageNumber: currentPage, pageSize: pageSize }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || data === null) {
    return <div>Loading images failed</div>;
  }
  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleSizeChange(size: number) {
    setPageSize(size);
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-32 p-4">
        {data.items.map((image: any) => (
          <ImageCard
            key={image.publicId}
            azureDescription={image.azureDescription}
            trainedModelDescription={image.trainedModelDescription}
            imageUrl={image.url}
          />
        ))}
      </div>
      <PaginationFooter
        currentPage={currentPage}
        totalPages={data.totalPages}
        totalImages={data.totalItemsCount}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
}

export default ImagesPage;
