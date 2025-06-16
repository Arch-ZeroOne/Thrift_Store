import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Overview from "../../components/Overview";
import Header from "../../components/Header";
import { useReactTable } from "@tanstack/react-table";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { NavLink } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";

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
  const { loading, setLoading } = useLoader();

  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return (
    <>
      <button className="btn btn-primary p-2 self-end mr-10">
        <NavLink to="/addProduct">
          <i class="fa-solid fa-plus"></i>
          Add Product
        </NavLink>
      </button>

      <div className="bg-white shadow-2xl font-[Poppins]">
        <div className="overflow-x-auto flex flex-col items-center gap-5">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <TableRow
                    name={product.product_name}
                    price={product.price}
                    status={"Published"}
                  />
                ))}
            </tbody>
          </table>
          {loading && <Loader />}
        </div>
      </div>
    </>
  );
}

async function getProducts(setProducts, setLoading) {
  let products = [];

  setLoading(true);
  const querySnapShot = await getDocs(collection(firestore, "test_images"));

  querySnapShot.forEach((data) => {
    products.push(data.data());
  });

  setLoading(false);

  setProducts(products);
}

function TableRow({ name, price, status }) {
  return (
    <tr>
      <td className="font-medium">{name}</td>
      <td className="text-green-400 font-medium">${price}</td>
      <td className="font-medium ">
        <div className="badge badge-success">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></circle>
              <polyline
                points="7 13 10 16 17 8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                stroke-miterlimit="10"
                strokeWidth="2"
              ></polyline>
            </g>
          </svg>
          {status}
        </div>
      </td>
    </tr>
  );
}

function Loader() {
  return (
    <div className="flex justify-center w-full items-center">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
}

export default ManageProduct;
