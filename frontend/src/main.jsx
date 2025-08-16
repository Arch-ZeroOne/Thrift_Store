import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./assets/css/output.css";
import "./assets/css/spinner.css";
import "./assets/css/options.css";
import LoaderContext from "./context/LoaderContext";
import RoleContext from "./context/RoleContext";
import CartContext from "./context/CartContext";
import FormContext from "./context/FormContext";
import PopUpModalContext from "./context/PopupModalContext";
import Navbar from "./components/Navbar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PopUpModalContext>
      <FormContext>
        <CartContext>
          <LoaderContext>
            <RoleContext>
              <RouterProvider router={router} />
            </RoleContext>
          </LoaderContext>
        </CartContext>
      </FormContext>
    </PopUpModalContext>
  </StrictMode>
);
