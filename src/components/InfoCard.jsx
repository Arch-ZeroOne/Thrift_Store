import React from "react";

function InfoCard({ product_name, description, image, quality, size, stock }) {
  return (
    <div className="flex items-center justify-around bg-base-100 shadow-sm w-[90%] mt-15 mr-auto ml-auto">
      <img className="h-100 w-200" src={image} alt="Product Info" />
      <div className=" flex items-center flex-col justify-around h-full gap-10 ">
        <h2 className=" text-2xl font-bold ">{product_name}</h2>
        <p>{description}</p>
        <div className=" justify-end flex items-center gap-10">
          <button className="btn btn-neutral">Buy Now</button>
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
