import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/admin/Dashboard";
import Registration from "./views/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);

export default router;
