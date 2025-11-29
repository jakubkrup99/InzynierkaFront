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
  if (!response.ok) {
    const errorMessage = data.errors
      ? (Object.values(data.errors)[0] as string[])[0]
      : "Login failed";
    const error = new Error(errorMessage);
    throw error;
  }
  return data;
}

function getAuthTokenRaw() {
  return localStorage.getItem("token");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function clearTokens() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

let isRefreshing = false;
let refreshQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${apiUrl}/identity/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Refresh token invalid or expired");

  const data = await res.json();

  if (!data.accessToken || !data.refreshToken)
    throw new Error("Invalid refresh response");

  saveTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export async function getAuthToken(): Promise<string | null> {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;
  try {
    const newToken = await refreshAccessToken();

    refreshQueue.forEach((p) => p.resolve(newToken));
    refreshQueue = [];

    return newToken;
  } catch (err) {
    refreshQueue.forEach((p) => p.reject(err));
    refreshQueue = [];
    clearTokens();
    return null;
  } finally {
    isRefreshing = false;
  }
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  let token = getAuthTokenRaw();
  let response = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.status !== 401) return response;

  try {
    token = await getAuthToken();
    if (!token) throw new Error("Unable to refresh token");

    response = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    window.location.href = "/";
    throw err;
  }

  return response;
}
