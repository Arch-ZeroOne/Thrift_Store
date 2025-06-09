import React from "react";
import Navbar from "../components/Navbar";
import Empty from "../assets/svg/empty-cart.svg";
function Home() {
  return (
    <div>
      <Navbar />
      <EmptyCart />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className=" items-center mt-15 flex flex-col gap-4 justify-center">
      <img src={Empty} className="h-80" alt="" />
      <h2 className="font-bold font-[Ubuntu] text-2xl">
        Store is Currently Empty
      </h2>
    </div>
  );
}

export default Home;
