import React from "react";
import Logo from "../../assets/icons/site-logo.png";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex ">
      <div className="font-[Poppins] flex flex-col gap-7 w-[25%] bg-[#080717] h-screen">
        <Name />
        <Links />
      </div>
      <Outlet />
    </div>
  );
}

function Links() {
  return (
    <div>
      <ul className="menu bg-transparent text-white rounded-box w-56 flex gap-3">
        <li>
          <div className="flex items-center ">
            <i class="fa-solid fa-gauge text-lg"></i>
            <NavLink to="/admin">
              <p className="text-md">Dashboard</p>
            </NavLink>
          </div>
        </li>
        <li>
          <details open>
            <summary className="text-md">
              <i class="fa-solid fa-cart-shopping"></i>Products
            </summary>
            <ul>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-file-circle-plus"></i>
                  <NavLink to="/admin/addproduct">
                    <p className="text-md">Add Product</p>
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-bars-progress"></i>
                  <NavLink to="/admin/trackproduct">
                    <p className="text-md">Manage Product</p>
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-warehouse"></i>
                  <NavLink to="/admin/inventory">
                    <p className="text-md">Inventory</p>
                  </NavLink>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <div className="flex items-center">
            <i class="fa-solid fa-truck-fast"></i>
            <p className="text-md">Orders</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

function Name() {
  return (
    <div className="text-white flex justify-center items-center gap-1 p-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6"
      >
        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
      </svg>

      <h1 className="text-lg font-medium">
        <span className="text-blue-600">Urban</span>
        Flick
      </h1>
    </div>
  );
}

export default DashboardLayout;
