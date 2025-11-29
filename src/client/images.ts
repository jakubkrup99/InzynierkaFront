import type CreateImageRequest from "../types/API/CreateImageRequest";
import type GetImagesRequest from "../types/API/GetImagesRequest";
import { getAuthToken } from "../Utils/auth";

const apiUrl = "https://localhost:7033/api";

export async function addImage(createImage: CreateImageRequest) {
  const token = getAuthToken();
  const formData = new FormData();
  console.log(createImage, "createImageRequest");
  formData.append("File", createImage.file);
  formData.append("Title", createImage.title);
  const response = await fetch(`${apiUrl}/images`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
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
  const token = getAuthToken();
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

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
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
  const token = getAuthToken();
  console.log(token, "token");
  console.log(imageId, "imageId");
  const response = await fetch(`${apiUrl}/images/${imageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
