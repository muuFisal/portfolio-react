import React from "react";
import { apiRequest, type ApiError } from "./client";
import { useApiLoading } from "./loading";

type QueryState<T> = {
  data: T | null;
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
};

const CACHE = new Map<string, any>();

export function useApiQuery<T>(key: string, path: string) {
  const { start, stop } = useApiLoading();
  const [tick, setTick] = React.useState(0);
  const [state, setState] = React.useState<Omit<QueryState<T>, "refetch">>(() => {
    if (CACHE.has(key)) {
      return { ...CACHE.get(key), loading: false, error: null };
    }
    return { data: null, loading: true, error: null };
  });

  const refetch = React.useCallback(() => {
    CACHE.delete(key);
    setTick((t) => t + 1);
  }, [key]);

  React.useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const run = async () => {
      // if cached, don't refetch unless asked
      if (CACHE.has(key)) {
        const cached = CACHE.get(key);
        if (mounted) setState({ ...cached, loading: false, error: null });
        return;
      }

      if (mounted) setState((s) => ({ ...s, loading: true, error: null }));
      start();
      try {
        const res = await apiRequest<T>(path, { signal: controller.signal });
        const next = { data: res.data, pagination: res.pagination };
        CACHE.set(key, next);
        if (mounted) setState({ ...next, loading: false, error: null });
      } catch (e: any) {
        if (!mounted) return;
        if (e?.name === "AbortError") return;
        setState((s) => ({ ...s, loading: false, error: e as ApiError }));
      } finally {
        stop();
      }
    };

    run();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [key, path, tick, start, stop]);

  return { ...state, refetch } as QueryState<T>;
}

export function clearApiCache(prefixKey?: string) {
  if (!prefixKey) {
    CACHE.clear();
    return;
  }
  for (const k of Array.from(CACHE.keys())) {
    if (k.startsWith(prefixKey)) CACHE.delete(k);
  }
}

export async function apiPost<T>(path: string, body: any) {
  return apiRequest<T>(path, { method: "POST", body });
}


export function useApiQuerySelect<T, R>(key: string, path: string, select: (data: T) => R) {
  const q = useApiQuery<T>(key, path);
  const selected = React.useMemo(() => (q.data ? select(q.data) : null), [q.data]);
  return { ...q, data: selected } as Omit<typeof q, 'data'> & { data: R | null };
}
