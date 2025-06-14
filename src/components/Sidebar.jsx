import React from "react";
import Logo from "../assets/icons/site-logo.png";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="font-[Ubuntu] flex flex-col gap-7 w-[25%] bg-[#1E1E24] h-full">
      <Name />
      <Links />
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
            <NavLink to="/dashboard">
              <p className="text-[17px]">Dashboard</p>
            </NavLink>
          </div>
        </li>
        <li>
          <details open>
            <summary className="text-lg">
              <i class="fa-solid fa-cart-shopping"></i>Products
            </summary>
            <ul>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-file-circle-plus"></i>
                  <NavLink to="/addProduct">
                    <p className="text-[17px]">Add Product</p>
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-bars-progress"></i>
                  <p className="text-[17px]">Manage Product</p>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-warehouse"></i>
                  <p className="text-[17px]">Inventory</p>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <div className="flex items-center">
            <i class="fa-solid fa-truck-fast"></i>
            <p className="text-[17px]">Orders</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

function Name() {
  return (
    <div className="text-white flex items-center gap-3 p-3">
      <img src={Logo} className="h-15"></img>
      <h1 className="text-xl font-bold">
        <span className="text-blue-600">Urban</span>
        Flick
      </h1>
    </div>
  );
}

export default Sidebar;
