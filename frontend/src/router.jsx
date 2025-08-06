import { createBrowserRouter } from "react-router-dom";
import AllProducts from "./views/AllProducts";
import Dashboard from "./views/admin/Dashboard";
import Registration from "./views/Registration";
import AddProduct from "./views/admin/AddProduct";
import ManageProduct from "./views/admin/ManageProduct";
import ProductInfo from "./views/ProductInfo";
import Home from "./views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
  },
  {
    path: "/manageProduct",
    element: <ManageProduct />,
  },
  {
    path: "allProduct/productinfo/:id",
    element: <ProductInfo />,
  },
  {
    path: "/allProduct",
    element: <AllProducts />,
  },
]);

export default router;
