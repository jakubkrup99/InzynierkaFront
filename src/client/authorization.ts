import type LoginRequest from "../types/API/LoginRequest";
import type RegisterRequest from "../types/API/RegisterRequest";

const apiUrl = import.meta.env.VITE_API_URL;
console.log("All env vars:", import.meta.env);
console.log("API URL:", import.meta.env.VITE_API_URL);
let logoutCallback: (() => void) | null = null;
export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb;
};

export async function registerUser(registerData: RegisterRequest) {
  console.log(apiUrl, "apiurl");
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
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
}

export async function logout() {
  try {
    await apiFetch(`${apiUrl}/api/authorization/logout`, { method: "POST" });
    console.log("logged out");
  } catch (err) {
    console.log(err);
  }
}

async function refreshAccessToken() {
  const res = await fetch(`${apiUrl}/api/authorization/refresh`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Refresh token invalid or expired");
  }
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  let response = await fetch(input, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.headers || {}),
    },
  });

  if (response.status !== 401) return response;

  try {
    await refreshAccessToken();
  } catch (err) {
    logoutCallback?.();
  }

  return response;
}
