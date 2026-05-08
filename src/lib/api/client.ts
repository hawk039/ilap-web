import type {
  ApiErrorPayload,
  AuthResponse,
  SessionTokens,
} from "./types";

const apiPrefix = "/api/v1";
const accessTokenKey = "ilap.accessToken";
const refreshTokenKey = "ilap.refreshToken";

export class ApiError extends Error {
  code: string;
  requestId?: string;
  status: number;

  constructor({
    code,
    message,
    requestId,
    status,
  }: {
    code: string;
    message: string;
    requestId?: string;
    status: number;
  }) {
    super(message);
    this.code = code;
    this.requestId = requestId;
    this.status = status;
  }
}

type RequestOptions = {
  auth?: boolean;
  body?: unknown;
  headers?: HeadersInit;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  retryOnUnauthorized?: boolean;
};

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
}

function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    return `${apiPrefix}${path}`;
  }

  return `${baseUrl}${apiPrefix}${path}`;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredTokens(): SessionTokens | null {
  if (!isBrowser()) {
    return null;
  }

  const accessToken = window.localStorage.getItem(accessTokenKey);
  const refreshToken = window.localStorage.getItem(refreshTokenKey);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

export function storeTokens(tokens: SessionTokens) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(accessTokenKey, tokens.accessToken);
  window.localStorage.setItem(refreshTokenKey, tokens.refreshToken);
}

export function clearTokens() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(accessTokenKey);
  window.localStorage.removeItem(refreshTokenKey);
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

async function refreshTokens(refreshToken: string): Promise<SessionTokens> {
  const response = await fetch(buildUrl("/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const parsed = await parseResponse(response);

  if (!response.ok) {
    const errorPayload = parsed as ApiErrorPayload;
    throw new ApiError({
      code: errorPayload.error?.code ?? "refresh_failed",
      message: errorPayload.error?.message ?? "Unable to refresh session.",
      requestId:
        errorPayload.requestId ?? response.headers.get("X-Request-Id") ?? undefined,
      status: response.status,
    });
  }

  const authResponse = parsed as AuthResponse;
  storeTokens(authResponse.session);
  return authResponse.session;
}

export async function apiRequest<T>(
  path: string,
  {
    auth = false,
    body,
    headers,
    method = "GET",
    retryOnUnauthorized = true,
  }: RequestOptions = {},
): Promise<T> {
  const storedTokens = getStoredTokens();
  const requestHeaders = new Headers(headers);
  let requestUrl = "";

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth && storedTokens?.accessToken) {
    requestHeaders.set("Authorization", `Bearer ${storedTokens.accessToken}`);
  }

  requestUrl = buildUrl(path);

  let response: Response;

  try {
    response = await fetch(requestUrl, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    throw new ApiError({
      code: "network_request_failed",
      message:
        error instanceof Error
          ? `Could not reach the backend at ${requestUrl}. Check that the backend server is running and the frontend proxy or API base URL is configured correctly.`
          : "Could not reach the backend. Check that the backend server is running.",
      status: 0,
    });
  }

  if (
    response.status === 401 &&
    auth &&
    retryOnUnauthorized &&
    storedTokens?.refreshToken
  ) {
    try {
      const nextTokens = await refreshTokens(storedTokens.refreshToken);
      return apiRequest<T>(path, {
        auth,
        body,
        headers: {
          ...Object.fromEntries(requestHeaders.entries()),
          Authorization: `Bearer ${nextTokens.accessToken}`,
        },
        method,
        retryOnUnauthorized: false,
      });
    } catch (error) {
      clearTokens();
      throw error;
    }
  }

  const parsed = await parseResponse(response);

  if (!response.ok) {
    const errorPayload = parsed as ApiErrorPayload;
    const requestId =
      errorPayload.requestId ?? response.headers.get("X-Request-Id") ?? undefined;
    let fallbackMessage =
      typeof parsed === "string" && parsed.includes("<!DOCTYPE html")
        ? `Backend endpoint ${requestUrl} did not return the expected API response. Check NEXT_PUBLIC_API_BASE_URL and confirm the platform backend is serving ${apiPrefix}.`
        : "Request failed.";

    if (response.status === 502) {
      fallbackMessage =
        "The backend reached its downstream legal answer service, but that service failed to respond correctly. This is a backend-side 502 error.";
    } else if (response.status === 503) {
      fallbackMessage =
        "The backend service is temporarily unavailable. Please try again shortly.";
    } else if (response.status === 504) {
      fallbackMessage =
        "The backend timed out while waiting for its downstream service. Please try again.";
    }

    if (requestId) {
      console.error("ILAP API request failed", {
        path,
        requestId,
        status: response.status,
      });
    }

    throw new ApiError({
      code: errorPayload.error?.code ?? "request_failed",
      message: errorPayload.error?.message ?? fallbackMessage,
      requestId,
      status: response.status,
    });
  }

  return parsed as T;
}

export const apiClient = {
  delete: <T>(path: string, options?: Omit<RequestOptions, "method">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, body, method: "PATCH" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, body, method: "POST" }),
};
