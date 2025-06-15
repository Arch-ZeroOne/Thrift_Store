import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Overview from "../../components/Overview";
import Header from "../../components/Header";
import { useReactTable } from "@tanstack/react-table";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/config";

function ManageProduct() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col gap-2">
        <Header />
        <Overview path="Products" />
        <Table />
      </div>
    </div>
  );
}

//TODO: Retrieve and view the data from the database
function Table() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProd = async () => {
      const productList = await getProducts();
      productList.forEach((data) => {
        setProducts(data.data());
      });
    };
    getProd();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="bg-white shadow-2xl">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Original Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

async function getProducts() {
  const querySnapShot = await getDocs(collection(firestore, "test_images"));

  return querySnapShot;
}

export default ManageProduct;
