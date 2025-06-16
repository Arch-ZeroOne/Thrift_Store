import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./assets/css/output.css";
import "./assets/css/spinner.css";
import "./assets/css/options.css";
import LoaderContext from "./context/LoaderContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderContext>
      <RouterProvider router={router} />
    </LoaderContext>
  </StrictMode>
);
