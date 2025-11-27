import { useQuery } from "@tanstack/react-query";
import ImageCard from "../components/ImageCard";
import { GetImages } from "../client/images";
import PaginationFooter from "../components/PaginationFooter";
import { useEffect, useState } from "react";
import { useSearchPhrase } from "../context/SearchContext";

function ImagesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchPhrase } = useSearchPhrase();
  const [debouncedSearchPhrase, setDebouncedSearchPhrase] =
    useState(searchPhrase);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchPhrase(searchPhrase);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchPhrase]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images", currentPage, pageSize, debouncedSearchPhrase],
    queryFn: () =>
      GetImages({
        pageNumber: currentPage,
        pageSize: pageSize,
        searchPhrase: debouncedSearchPhrase,
      }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || data === null) {
    return <div>Loading images failed - {error?.message}</div>;
  }
  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleSizeChange(size: number) {
    setPageSize(size);
  }
  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-32 p-4 min-h-screen">
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
