import type CreateImageRequest from "../types/API/CreateImageRequest";
import { getAuthToken } from "../Utils/auth";

const apiUrl = "https://localhost:7033/api";

export async function addImage(createImage: CreateImageRequest) {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("File", createImage.file);
  const response = await fetch(`${apiUrl}/images`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data, "data");
  if (!response.ok) {
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Generating caption failed";
    const error = new Error(errorMessage);
    throw error;
  }

  return data.description;
}
