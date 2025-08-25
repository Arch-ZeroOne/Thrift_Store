import React from "react";
import Options from "./Options";
function InfoCard({
  product_name,
  description,
  image,
  price,
  quality,
  size,
  stock,
  onAddCart,
}) {
  return (
    <div className="font-[Geist] ">
      <div className="flex  items-center justify-between  bg-base-100 shadow-sm w-[98%] mt-5  mb-8 border border-gray-500/40 rounded-md p-10 ml-auto mr-auto ">
        {image && (
          <img
            className="h-100 w-[30%] ml-auto mr-auto"
            src={image[0]}
            alt="Product Info"
          />
        )}
        <section className="flex items-center flex-col  h-full gap-10 self-start w-[40%] pr-10 ">
          <div className="flex flex-col gap-5 h-full ">
            <div className="flex flex-col gap-5">
              <h2 className=" text-5xl font-bold ">{product_name}</h2>
              <div className="flex items-center gap-3 flex-col">
                <div className="border rounded-4xl w-30 text-center bg-blue-600 text-white p-2 self-start">
                  ${price} USD
                </div>
                <div className="self-start border-1 border-gray-500 w-115"></div>
              </div>
            </div>
            <div>
              <span className="font-bold">SIZE</span>
              <Options />
            </div>
            <div className="flex flex-col gap-2">
              <p>{description}</p>
            </div>
          </div>
          <div className=" justify-end flex items-center gap-3">
            <button
              class="inline-flex items-center gap-2  justify-center px-4 py-2 bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-xl font-medium rounded-2xl hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer w-80 p-3"
              onClick={() => onAddCart(product_name, price, image)}
            >
              <i class="fa-solid fa-cart-plus"></i> Add To Cart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InfoCard;
