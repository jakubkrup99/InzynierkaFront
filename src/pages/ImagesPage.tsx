import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImageCard from "../components/ImageCard";
import { deleteImage, GetImages } from "../client/images";
import PaginationFooter from "../components/PaginationFooter";
import { useEffect, useState } from "react";
import { useSearchPhrase } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import { setLogoutCallback } from "../client/authorization";

function ImagesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { searchPhrase } = useSearchPhrase();
  const [debouncedSearchPhrase, setDebouncedSearchPhrase] =
    useState(searchPhrase);
  const queryClient = useQueryClient();

  const { logout } = useAuth();

  useEffect(() => {
    setLogoutCallback(logout);
  }, [logout]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchPhrase(searchPhrase);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchPhrase]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", currentPage, pageSize, debouncedSearchPhrase],
    queryFn: () =>
      GetImages({
        pageNumber: currentPage,
        pageSize: pageSize,
        searchPhrase: debouncedSearchPhrase,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (imageId: string) => deleteImage(imageId),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(
        ["images", currentPage, pageSize, debouncedSearchPhrase],
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.filter((x: any) => x.publicId !== deletedId),
            totalItemsCount: old.totalItemsCount - 1,
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["images", currentPage, pageSize, debouncedSearchPhrase],
      });
    },
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
    setCurrentPage(1);
  }
  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-32 p-4 min-h-screen">
        {data.items.length > 0 ? (
          data.items.map((image: any) => (
            <ImageCard
              key={image.publicId}
              azureDescription={image.azureDescription}
              trainedModelDescription={image.trainedModelDescription}
              imageId={image.publicId}
              onDelete={deleteMutation.mutate}
              imageUrl={image.url}
              title={image.title}
            />
          ))
        ) : (
          <h2 className="text-5xl text-center col-span-full">
            There are no images
          </h2>
        )}
      </div>
      <PaginationFooter
        currentPage={currentPage}
        totalPages={data.totalPages}
        totalImages={data.totalItemsCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
}

export default ImagesPage;
