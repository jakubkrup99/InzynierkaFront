import type LoginRequest from "../types/API/LoginRequest";
import type RegisterRequest from "../types/API/RegisterRequest";

// const apiUrl = import.meta.env.API_URL;
const apiUrl = "https://localhost:7033/api";

export async function registerUser(registerData: RegisterRequest) {
  const response = await fetch(`${apiUrl}/identity/register`, {
    method: "POST",
    body: JSON.stringify(registerData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Registration failed";
    const error = new Error(errorMessage);
    throw error;
  }
  return response;
}

export async function loginUser(loginData: LoginRequest) {
  const response = await fetch(`${apiUrl}/identity/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Login failed";
    const error = new Error(errorMessage);
    throw error;
  }
  return data;
}
