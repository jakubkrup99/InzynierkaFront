import type CreateImageRequest from "../types/API/CreateImageRequest";
import type GetImagesRequest from "../types/API/GetImagesRequest";
import { apiFetch } from "./authorization";

const apiUrl = "https://localhost:7033/api";

export async function addImage(createImage: CreateImageRequest) {
  const formData = new FormData();
  formData.append("File", createImage.file);
  formData.append("Title", createImage.title);
  const response = await apiFetch(`${apiUrl}/images`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Generating caption failed";
    const error = new Error(errorMessage);
    throw error;
  }

  return data;
}

export async function GetImages(GetImagesRequest: GetImagesRequest) {
  const { searchPhrase, pageNumber, pageSize, sortBy, sortDirection } =
    GetImagesRequest;

  let url = `${apiUrl}/images?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (searchPhrase) {
    url += `&searchPhrase=${searchPhrase}`;
  }
  if (sortBy) {
    url += `&sortBy=${sortBy}`;
  }
  if (sortDirection) {
    url += `&sortDirection=${sortDirection}`;
  }

  const response = await apiFetch(url);
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Fetching images failed";
    const error = new Error(errorMessage);
    throw error;
  }

  return data;
}

export async function deleteImage(imageId: string) {
  const response = await apiFetch(`${apiUrl}/images/${imageId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Generating caption failed";
    const error = new Error(errorMessage);
    throw error;
  }
}
