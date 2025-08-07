//Admin Components
import Dashboard from "./views/admin/Dashboard";
import AddProduct from "./views/admin/AddProduct";
import TrackProduct from "./views/admin/TrackProduct";
//Client components
import AllProducts from "./views/client/AllProducts";
import Registration from "./views/client/Registration";
import ProductInfo from "./views/client/ProductInfo";
import Home from "./views/client/Home";
import DashboardLayout from "./views/layout/DashboardLayout";

import { createBrowserRouter } from "react-router-dom";
import ManageProduct from "./views/admin/ManageProduct";

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
    path: "/allproducts",
    element: <AllProducts />,
  },
  {
    path: "allProduct/productinfo/:id",
    element: <ProductInfo />,
  },

  //Admin routes
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "trackproduct",
        element: <TrackProduct />,
      },
      {
        path: "inventory",
        element: <ManageProduct />,
      },
    ],
  },
]);

export default router;
