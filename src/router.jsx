import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/admin/Dashboard";
import Registration from "./views/Registration";
import AddProduct from "./views/admin/AddProduct";
import ManageProduct from "./views/admin/ManageProduct";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
  },
  {
    path: "/manageProduct",
    element: <ManageProduct />,
  },
]);

export default router;
