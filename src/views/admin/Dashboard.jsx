import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Overview from "../../components/Overview";

function Dashboard() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <section className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <Header />
          <Overview path="Overview" />
        </div>
        <div className="w-full">
          <StatisticCards />
        </div>
      </section>
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

export default Dashboard;
