import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore: CSS imported as a side effect without type declarations
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
