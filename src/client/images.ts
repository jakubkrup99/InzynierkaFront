import type CreateImageRequest from "../types/API/CreateImageRequest";

const apiUrl = "https://localhost:7033/api";

export async function addImage(createImage: CreateImageRequest) {
  const response = await fetch(`${apiUrl}/images`, {
    method: "POST",
    body: JSON.stringify(createImage),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
  }
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Generating caption failed";
    const error = new Error(errorMessage);
    throw error;
  }
}
