import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Overview from "../../components/Overview";
import Header from "../../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { NavLink } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { getProductBySeller } from "../../firebase/products";
import { useUser } from "../../context/RoleContext";
import { Product } from "../../types/interfaces";
function ManageProduct() {
  const { currentUser } = useUser();
  const [sellerProduct, setSellerProduct] = useState<Product | null>();

  useEffect(() => {
    const retrieveProduct = async () => {
      if (currentUser) {
        const products = await getProductBySeller(currentUser.uid);
        if (products) setSellerProduct(products);
      }
    };
    retrieveProduct();
  }, [currentUser]);
  //Table Headers
  const columns: GridColDef[] = [
    { field: "product-name", headerName: "Product Name", width: 200 },

    {
      field: "original-price",
      headerName: "Original Price",
      width: 200,
    },
  ];

  //Table data contents
  const rows: GridRowsProp = sellerProduct;

  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full flex flex-col gap-2">
        <Header />
        <Overview path="Products" />

        <DataGrid columns={columns} rows={rows} className="cursor-pointer" />
      </div>
    </div>
  );
}

//TODO: Retrieve and view the data from the database
function Table() {
  return <></>;
}

export default ManageProduct;
