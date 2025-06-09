import React from "react";
import Logo from "../assets/icons/site-logo.png";
function Navbar() {
  return (
    <div className="font-[Ubuntu] flex justify-between p-4 shadow-lg">
      <BrandName />
      <Links />
      <SearchBar />
      <div className="flex gap-10 items-center">
        <AccountDrawer />
        <CartDrawer />
      </div>
    </div>
  );
}

function BrandName() {
  return (
    <div className="flex items-center">
      <img src={Logo} className="h-10" alt="" />
      <h1 className="font-bold ">UrbanFlick</h1>
    </div>
  );
}
function Links() {
  return (
    <div className="list-none flex items-center gap-9 font-medium cursor-pointer">
      <li>Home</li>
      <li>T-Shirts</li>
      <li>Pants</li>
      <li>Shoes</li>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center border rounded-lg p-2 h-10 font-[Ubuntu] w-70 justify-center">
      <input
        type="text "
        placeholder="Search for A Product"
        className="outline-0 text-sm"
      ></input>
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  );
}

function CartDrawer() {
  return (
    <div className="font-[Ubuntu]">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            <i class="fa-solid fa-cart-shopping text-xl"></i>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div
            className="menu bg-base-200 text-base-  content min-h-full  p-4 flex-col justify-between"
            style={{
              width: "25rem",
            }}
          >
            <div className="flex flex-col gap-3 ">
              <h1 className="font-bold text-2xl text-center">My Cart</h1>
              <h2 className="font-normal text-xl ml-3">Cart is Empty</h2>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center  justify-around w-full">
                <p className="text-xl">Total</p>
                <p className="text-xl">$0:00</p>
              </div>
              <button class="btn btn-dash btn-primary w-40">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountDrawer() {
  return (
    <div className="font-[Ubuntu]">
      <div className="dropdown dropdown-bottom dropdown-center">
        <div tabIndex={0} role="button" className="btn m-1">
          <i class="fa-solid fa-user text-xl"></i>
        </div>
        <ul
          style={{
            width: "30rem",
          }}
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-80 p-2 shadow-sm"
        >
          <li>
            <div className="flex items-center gap-2">
              <i class="fa-brands fa-google text-xl"></i>
              <p className="font-bold">Facebook</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <i class="fa-brands fa-facebook text-xl"></i>
              <p className="font-bold">Google</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
