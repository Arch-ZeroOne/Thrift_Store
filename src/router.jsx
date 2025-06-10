import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Registration from "./views/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);

export default router;
