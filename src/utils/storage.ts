/**
 * Local storage helper.
 * Safe in dev even if localStorage is blocked (or in private mode).
 */
const safeGet = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
};

export const storage = {
  // Generic helpers (used across the app)
  get: (key: string) => safeGet(key),
  set: (key: string, value: unknown) => safeSet(key, JSON.stringify(value)),
  getJson: <T = unknown>(key: string): T | null => {
    const raw = safeGet(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  // App-specific helpers (backward compatible)
  getTheme: () => safeGet("theme") || "dark",
  setTheme: (v: string) => safeSet("theme", v),
  getLng: () => safeGet("lng") || "en",
  setLng: (v: string) => safeSet("lng", v),
};
