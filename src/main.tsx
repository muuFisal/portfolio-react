import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { AppProviders } from "./app/providers";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // NOTE: React.StrictMode double-invokes effects in dev which can show some requests
  // as "(canceled)" in the Network tab due to AbortController cleanup.
  // We disable it here to avoid confusion during local development.
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>
);
