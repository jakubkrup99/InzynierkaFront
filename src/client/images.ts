import type CreateImageRequest from "../types/API/CreateImageRequest";
import type GetImagesRequest from "../types/API/GetImagesRequest";

const apiUrl = import.meta.env.VITE_API_URL;

export async function addImage(createImage: CreateImageRequest) {
  const formData = new FormData();
  formData.append("File", createImage.file);
  formData.append("Title", createImage.title);
  return fetchWithJwt("/api/images", { method: "POST", body: formData });
}

export async function GetImages(GetImagesRequest: GetImagesRequest) {
  const { searchPhrase, pageNumber, pageSize, sortBy, sortDirection } =
    GetImagesRequest;

  let url = `/api/images?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (searchPhrase) {
    url += `&searchPhrase=${searchPhrase}`;
  }
  if (sortBy) {
    url += `&sortBy=${sortBy}`;
  }
  if (sortDirection) {
    url += `&sortDirection=${sortDirection}`;
  }
  return fetchWithJwt(url);
}

export async function deleteImage(imageId: string) {
  return fetchWithJwt(`/api/images/${imageId}`, { method: "DELETE" });
}

export async function updateImage(imageId: string) {
  return fetchWithJwt(`/api/images/${imageId}`, { method: "PUT" });
}

async function fetchWithJwt(input: string, init?: RequestInit) {
  const token = localStorage.getItem("token");
  const headers = new Headers(init?.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`${apiUrl}${input}`, { ...init, headers });
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  let data: any = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const errorMessage = data?.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Request failed";
    throw new Error(errorMessage);
  }

  return data;
}
