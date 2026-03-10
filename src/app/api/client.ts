import i18n from "../../i18n";
import type { ApiEnvelope, ApiError, Locale } from "./types";

type QueryValue = string | number | boolean | null | undefined;

export type RequestOptions = {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: BodyInit | FormData | Record<string, unknown> | null;
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
};

function trimTrailingSlashes(value: string) {
  return value.replace(/\/+$/, "");
}

function trimLeadingSlashes(value: string) {
  return value.replace(/^\/+/, "");
}

function normalizeLocale(value?: string): Locale {
  return value?.startsWith("ar") ? "ar" : "en";
}

function getBaseUrl() {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return trimTrailingSlashes(envBase || window.location.origin);
}

function getApiPrefix() {
  const envPrefix = import.meta.env.VITE_API_PREFIX as string | undefined;
  const prefix = envPrefix || "/api/v1/portfolio";
  return `/${trimLeadingSlashes(trimTrailingSlashes(prefix))}`;
}

function buildSearchParams(query?: Record<string, QueryValue>) {
  const searchParams = new URLSearchParams();

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    searchParams.set(key, String(value));
  });

  const search = searchParams.toString();
  return search ? `?${search}` : "";
}

function composeUrl(path: string, query?: Record<string, QueryValue>) {
  const normalizedPath = trimLeadingSlashes(path);
  const url = `${getBaseUrl()}${getApiPrefix()}/${normalizedPath}`;
  return `${url}${buildSearchParams(query)}`;
}

function isFormData(body: RequestOptions["body"]): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

async function parseJson(response: Response) {
  const rawText = await response.text();

  if (!rawText) {
    return null;
  }

  try {
    return JSON.parse(rawText);
  } catch {
    return null;
  }
}

function normalizeError(response: Response, payload: any): ApiError {
  return {
    status: response.status,
    code: typeof payload?.code === "number" ? payload.code : undefined,
    message:
      payload?.message ||
      payload?.error ||
      response.statusText ||
      "Request failed",
    details: payload,
    validation:
      typeof payload?.errors === "object" && payload?.errors
        ? payload.errors
        : undefined,
  };
}

export function getCurrentLocale() {
  return normalizeLocale(i18n.resolvedLanguage || i18n.language);
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": getCurrentLocale(),
    ...options.headers,
  };

  const requestInit: RequestInit = {
    method: options.method || "GET",
    headers,
    signal: options.signal,
  };

  if (options.body != null) {
    if (isFormData(options.body)) {
      requestInit.body = options.body;
    } else if (typeof options.body === "string" || options.body instanceof Blob) {
      requestInit.body = options.body;
    } else {
      headers["Content-Type"] = "application/json";
      requestInit.body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(composeUrl(path, options.query), requestInit);
  const payload = await parseJson(response);

  if (!response.ok) {
    throw normalizeError(response, payload);
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload as ApiEnvelope<T>;
  }

  return {
    code: response.status,
    message: response.statusText || "OK",
    data: payload as T,
    pagination: null,
  } satisfies ApiEnvelope<T>;
}
