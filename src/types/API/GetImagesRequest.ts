export default interface GetImagesRequest {
  pageNumber: number;
  pageSize: number;
  sortDirection?: number;
  sortBy?: string;
  searchPhrase?: string;
}
