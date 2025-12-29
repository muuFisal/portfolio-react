import React from "react";

type LoadingCtx = {
  loadingCount: number;
  start: () => void;
  stop: () => void;
};

export const ApiLoadingContext = React.createContext<LoadingCtx | null>(null);

export function ApiLoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = React.useState(0);

  const start = React.useCallback(() => setLoadingCount((c) => c + 1), []);
  const stop = React.useCallback(
    () => setLoadingCount((c) => (c > 0 ? c - 1 : 0)),
    []
  );

  return (
    <ApiLoadingContext.Provider value={{ loadingCount, start, stop }}>
      {children}
    </ApiLoadingContext.Provider>
  );
}

export function useApiLoading() {
  const ctx = React.useContext(ApiLoadingContext);
  if (!ctx) throw new Error("useApiLoading must be used inside ApiLoadingProvider");
  return ctx;
}
