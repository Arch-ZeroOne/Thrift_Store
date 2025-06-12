import React from "react";
import Logo from "../assets/icons/site-logo.png";
import DefaultProfile from "../assets/images/default-profile.png";
function Sidebar() {
  return (
    <div className="flex ">
      <div className="font-[Ubuntu] flex flex-col gap-7 w-[25%] bg-[#1E1E24] h-screen">
        <Name />
        <Links />
      </div>
      <div className="flex flex-col w-full gap-5 ">
        <div className="flex flex-col gap-1">
          <Header />
          <Overview />
        </div>
        <div>
          <StatisticCards />
        </div>
      </div>
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
            <a className="text-[17px]">Dashboard</a>
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
                  <a className="text-[17px]">Add Product</a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-bars-progress"></i>
                  <a className="text-[17px]">Manage Product</a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="fa-solid fa-warehouse"></i>
                  <a className="text-[17px]">Inventory</a>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <div className="flex items-center">
            <i class="fa-solid fa-truck-fast"></i>
            <a className="text-[17px]">Orders</a>
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
function Header() {
  return (
    <div className="font-[Ubuntu]">
      <div className="navbar bg-base-100 shadow-xl">
        <div className="flex w-full gap-5 items-center justify-end">
          <i class="fa-solid fa-bell text-2xl"></i>
          <section className="flex flex-col">
            <h2>Username21</h2>
            <p className="self-end text-sm text-gray-400">Role</p>
          </section>
          <div className="flex-none">
            <div className="dropdown dropdown-end p-3 ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={DefaultProfile}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content font-bold bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>

                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="shadow-xl bg-white border border-solid border-gray-400/50 p-3">
      <h1 className="font-[Ubuntu] font-medium">Overview</h1>
    </div>
  );
}

function StatisticCards() {
  const statistic = [
    {
      title: "Total Sales",
      amount: `$0`,
    },
    {
      title: "Customers",
      amount: 0,
    },

    {
      title: "Orders",
      amount: 0,
    },
    {
      title: "Discounts",
      amount: `$0`,
    },
  ];
  return (
    <div className="flex justify-around font-[Ubuntu]">
      {statistic.map((stats) => (
        <Card name={stats.title} value={stats.amount} />
      ))}
    </div>
  );
}

function Card({ name, value }) {
  return (
    <div className="shadow-xl w-60 border border-gray-400/50 p-5 h-32 rounded-lg flex flex-col gap-1 justify-center">
      <p className="text-gray-800/60 text-lg font-medium ">{name}</p>
      <p className="font-bold text-xl">{value}</p>
    </div>
  );
}
export default Sidebar;
