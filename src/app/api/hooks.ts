import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "./client";
import { useApiLoading } from "./loading";
import type { ApiEnvelope, ApiError, ApiPagination } from "./types";

type QueryKey = string | readonly unknown[];

type QueryOptions = {
  enabled?: boolean;
  keepPreviousData?: boolean;
  trackLoading?: boolean;
};

type QueryState<T> = {
  data: T | null;
  pagination: ApiPagination | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
};

type MutationOptions = {
  trackLoading?: boolean;
};

type MutationState<TData, TVariables> = {
  data: TData | null;
  loading: boolean;
  error: ApiError | null;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  reset: () => void;
};

type CachedValue<T> = {
  data: T;
  pagination: ApiPagination | null;
};

const CACHE = new Map<string, CachedValue<unknown>>();

function serializeKey(key: QueryKey, locale: string) {
  return JSON.stringify([locale, key]);
}

export function clearApiCache(prefix?: string) {
  if (!prefix) {
    CACHE.clear();
    return;
  }

  Array.from(CACHE.keys()).forEach((cacheKey) => {
    if (cacheKey.includes(prefix)) {
      CACHE.delete(cacheKey);
    }
  });
}

export function useApiQuery<T>(
  key: QueryKey,
  fetcher: (signal: AbortSignal) => Promise<ApiEnvelope<T>>,
  options: QueryOptions = {}
) {
  const { i18n } = useTranslation();
  const { start, stop } = useApiLoading();
  const [tick, setTick] = React.useState(0);
  const locale = React.useMemo(
    () => getCurrentLocale(),
    [i18n.resolvedLanguage, i18n.language]
  );
  const cacheKey = React.useMemo(() => serializeKey(key, locale), [key, locale]);
  const fetcherRef = React.useRef(fetcher);

  React.useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const [state, setState] = React.useState<Omit<QueryState<T>, "refetch">>(() => {
    const cached = CACHE.get(cacheKey) as CachedValue<T> | undefined;
    if (cached) {
      return {
        data: cached.data,
        pagination: cached.pagination,
        loading: false,
        error: null,
      };
    }
    return {
      data: null,
      pagination: null,
      loading: Boolean(options.enabled ?? true),
      error: null,
    };
  });

  const refetch = React.useCallback(() => {
    CACHE.delete(cacheKey);
    setTick((value) => value + 1);
  }, [cacheKey]);

  React.useEffect(() => {
    if (options.enabled === false) {
      setState((current) => ({ ...current, loading: false }));
      return;
    }

    let active = true;
    const controller = new AbortController();
    const cached = CACHE.get(cacheKey) as CachedValue<T> | undefined;

    if (cached) {
      setState({
        data: cached.data,
        pagination: cached.pagination,
        loading: false,
        error: null,
      });
      return () => {
        active = false;
        controller.abort();
      };
    }

    setState((current) => ({
      data: options.keepPreviousData ? current.data : null,
      pagination: options.keepPreviousData ? current.pagination : null,
      loading: true,
      error: null,
    }));

    if (options.trackLoading) {
      start();
    }

    fetcherRef.current(controller.signal)
      .then((response) => {
        if (!active) {
          return;
        }
        const nextState = {
          data: response.data,
          pagination: response.pagination,
        };
        CACHE.set(cacheKey, nextState);
        setState({
          ...nextState,
          loading: false,
          error: null,
        });
      })
      .catch((error: ApiError & { name?: string }) => {
        if (!active || error?.name === "AbortError") {
          return;
        }
        setState((current) => ({
          ...current,
          loading: false,
          error,
        }));
      })
      .finally(() => {
        if (options.trackLoading) {
          stop();
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [
    cacheKey,
    options.enabled,
    options.keepPreviousData,
    options.trackLoading,
    start,
    stop,
    tick,
  ]);

  return { ...state, refetch } satisfies QueryState<T>;
}

export function useApiMutation<TData, TVariables>(
  mutate: (variables: TVariables) => Promise<ApiEnvelope<TData>>,
  options: MutationOptions = {}
) {
  const { start, stop } = useApiLoading();
  const [data, setData] = React.useState<TData | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);
  const [loading, setLoading] = React.useState(false);

  const mutateAsync = React.useCallback(
    async (variables: TVariables) => {
      setLoading(true);
      setError(null);

      if (options.trackLoading) {
        start();
      }

      try {
        const response = await mutate(variables);
        setData(response.data);
        return response.data;
      } catch (mutationError) {
        const apiError = mutationError as ApiError;
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
        if (options.trackLoading) {
          stop();
        }
      }
    },
    [mutate, options.trackLoading, start, stop]
  );

  const reset = React.useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutateAsync,
    reset,
  } satisfies MutationState<TData, TVariables>;
}
