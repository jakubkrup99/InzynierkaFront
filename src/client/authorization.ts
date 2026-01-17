import type LoginRequest from "../types/API/LoginRequest";
import type RegisterRequest from "../types/API/RegisterRequest";

const apiUrl = import.meta.env.VITE_API_URL;

export async function registerUser(registerData: RegisterRequest) {
  const response = await fetch(`${apiUrl}/api/authorization/register`, {
    method: "POST",
    body: JSON.stringify(registerData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data ?? "Registration failed";
    const error = new Error(errorMessage);
    throw error;
  }
  return response;
}

export async function loginUser(loginData: LoginRequest) {
  const response = await fetch(`${apiUrl}/api/authorization/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    throw {
      code: response.status,
      message: data?.message || "Unexpected server error",
    };
  }

  return data;
}
