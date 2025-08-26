import React, { useEffect } from "react";
import Header from "../../components/Header";
import Revenue from "../../charts/Revenue";
import ActiveUsers from "../../charts/ActiveUsers";
function Dashboard() {
  return (
    <div className="flex w-full overflow-scroll ">
      <section className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <Header />
        </div>
        <div className="w-full font-[Poppins]">
          <StatisticCards />
        </div>
        <section className="w-full h-full flex items-center gap-3">
          <div className="h-90 w-[60%]  shadow-2xl rounded-2xl">
            <Revenue />
          </div>
          <div className="shadow-2xl rounded-2xl h-90 ">
            <ActiveUsers />
          </div>
        </section>
      </section>
    </div>
  );
}

function StatisticCards() {
  const statistic = [
    {
      title: "Total Sale",
      amount: <span className="text-blue-500 text-xl font-medium">$0</span>,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
    },
    {
      title: "Visitors",
      amount: <span className="text-blue-500 text-xl font-medium">0</span>,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },

    {
      title: "Orders",
      amount: <span className="text-blue-500 text-xl font-medium">0</span>,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      ),
    },
    {
      title: "Customers",
      amount: <span className="text-blue-500 text-xl font-medium">0</span>,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="flex justify-around ">
      {statistic.map((stats) => (
        <Card name={stats.title} value={stats.amount} svg={stats.svg} />
      ))}
    </div>
  );
}

function Card({ name, value, svg }) {
  return (
    <section className="shadow-xl w-60 border border-gray-400/50 p-5 h-32 rounded-lg flex  gap-1 justify-between items-center ">
      <div className="flex flex-col gap-3">
        <p className=" text-lg font-bold ">{name}</p>
        {value}
      </div>
      {svg}
    </section>
  );
}

export default Dashboard;
