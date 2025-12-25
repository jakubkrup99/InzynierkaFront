import type CreateImageRequest from "../types/API/CreateImageRequest";
import type GetImagesRequest from "../types/API/GetImagesRequest";
import { apiFetch } from "./authorization";

const apiUrl = import.meta.env.VITE_API_URL;

export async function addImage(createImage: CreateImageRequest) {
  const formData = new FormData();
  formData.append("File", createImage.file);
  formData.append("Title", createImage.title);
  let response;

  try {
    response = await apiFetch(`${apiUrl}/images`, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    throw new Error("Error while sending new image");
  }
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Error while parsing response from addImage");
  }

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
  let response;
  try {
    response = await apiFetch(url);
  } catch (err) {
    throw new Error("Network error while fetching images");
  }
  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error("Failed to parse server response");
  }

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
  let response;
  try {
    response = await apiFetch(`${apiUrl}/images/${imageId}`, {
      method: "DELETE",
    });
  } catch {
    throw new Error("Error while deleting image");
  }
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Generating caption failed";
    const error = new Error(errorMessage);
    throw error;
  }
}
