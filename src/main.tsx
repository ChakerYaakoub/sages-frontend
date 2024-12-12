import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoadingProvider } from "./context/LoadingContext";
import { AlertProvider } from "./context/AlertContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </AlertProvider>
  </StrictMode>
);
