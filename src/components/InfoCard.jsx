import React from "react";

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
    <div className="font-[Poppins] ">
      <div className="flex items-center justify-around bg-base-100 shadow-sm w-[96%] mt-5 mr-auto ml-auto mb-8 border border-gray-500/40 rounded-lg p-10">
        <div className="w-100">
          <img className="h-100 w-[88%]" src={image} alt="Product Info" />
        </div>
        <section className=" flex items-center flex-col  h-full gap-10 self-start">
          <div className="flex flex-col gap-5 h-full ">
            <div className="flex flex-col gap-2">
              <h2 className=" text-3xl font-bold ">{product_name}</h2>
              <div className="flex items-center gap-3 ">
                <p className="font-semibold text-lg">{price}</p>
                <p className="font-medium">
                  <span className="font-bold text-lg">Stock:</span> {stock}
                </p>
              </div>
              <p className="text-md font-medium  opacity-80 ">
                This item is originally retailed from
              </p>
            </div>
            <div>
              <span className="font-bold">Product Size:</span>
              {size}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">Product Description:</h4>
              <p>{description}</p>
            </div>
          </div>
          <div className=" justify-end flex items-center gap-3">
            <button className="btn btn-neutral w-45 p-7 text-2xl">
              Buy Now
            </button>
            <button
              className="btn btn-primary w-45 p-7 "
              onClick={() => onAddCart(product_name, price, image)}
            >
              Add To Cart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InfoCard;
