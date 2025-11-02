import type RegisterRequest from "../types/API/RegisterRequest";

const apiUrl = import.meta.env.API_URL;

export async function registerUser(registerData: RegisterRequest) {
  const response = await fetch(`${apiUrl}/identity/register`, {
    method: "POST",
    body: JSON.stringify(registerData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while registering user.");
    throw error;
  }
}
