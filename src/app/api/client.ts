import i18n from "../../i18n";

type ApiEnvelope<T> = {
  code: number;
  message?: string;
  data: T;
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

function cleanBase(base: string) {
  return base.replace(/\/$/, "");
}

function joinUrl(base: string, path: string) {
  const b = cleanBase(base);
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

/**
 * Defaults:
 * - VITE_API_BASE_URL: https://dashboard.mohamed-fisal.com
 * - VITE_API_PREFIX: /api
 *
 * Final URL: {base}{prefix}{path}
 * With a fallback: if base+prefix returns 404, retry base+path.
 */
const DEFAULT_BASE = "https://dashboard.mohamed-fisal.com";
const BASE_URL = cleanBase(import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE);
const PREFIX = (import.meta.env.VITE_API_PREFIX || "/api").replace(/\/$/, "");

export type RequestOptions = {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
};

export async function apiRequest<T>(path: string, opts: RequestOptions = {}) {
  const lang = (i18n.language || "en").startsWith("ar") ? "ar" : "en";

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": lang,
    ...(opts.headers || {}),
  };

  const init: RequestInit = {
    method: opts.method || "GET",
    headers,
    signal: opts.signal,
  };

  if (opts.body != null) {
    // If FormData, let the browser set content-type boundaries
    if (typeof FormData !== "undefined" && opts.body instanceof FormData) {
      init.body = opts.body;
    } else {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(opts.body);
    }
  }

  const urlWithPrefix = joinUrl(BASE_URL, `${PREFIX}${path.startsWith("/") ? path : `/${path}`}`);
  const urlNoPrefix = joinUrl(BASE_URL, path);

  const tryFetch = async (url: string) => {
    const res = await fetch(url, init);
    const text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      const msg =
        (json && (json.message || json.error || json?.data?.message)) ||
        res.statusText ||
        "Request failed";
      const err: ApiError = { status: res.status, message: msg, details: json };
      throw err;
    }

    // Backend envelope {code, message, data, pagination}
    const envelope = json as ApiEnvelope<T> | null;
    if (envelope && typeof envelope === "object" && "data" in envelope) {
      return envelope;
    }

    // Fallback (in case API returns raw)
    return { code: res.status, data: json as T } as ApiEnvelope<T>;
  };

  try {
    return await tryFetch(urlWithPrefix);
  } catch (e: any) {
    // If /api prefix is wrong, retry without it on 404.
    if (e?.status === 404) {
      return await tryFetch(urlNoPrefix);
    }
    throw e;
  }
}
