//Admin Components
import Dashboard from "./views/admin/Dashboard";
import AddProduct from "./views/admin/AddProduct";
import TrackProduct from "./views/admin/TrackProduct";
//Client components
import AllProducts from "./views/client/AllProducts";
import Registration from "./views/client/Registration";
import ProductInfo from "./views/client/ProductInfo";
import Home from "./views/client/Home";

import { createBrowserRouter } from "react-router-dom";

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
    path: "allProduct/productinfo/:id",
    element: <ProductInfo />,
  },
  {
    path: "/allProduct",
    element: <AllProducts />,
  },
  {
    path: "/trackproduct",
    element: <TrackProduct />,
  },
]);

export default router;
