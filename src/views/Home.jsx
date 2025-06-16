import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Empty from "../assets/svg/empty-cart.svg";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../components/Loader";
import { useLoader } from "../context/LoaderContext";
function Home() {
  const [products, setProducts] = useState();
  const { loading, setLoading } = useLoader();

  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return (
    <div>
      <Navbar />
      {loading && <Loader />}

      {!products && !loading && <EmptyCart />}
      <section className="grid grid-cols-3 justify-items-center mt-4 gap-3 mb-5 md:grid-cols-2  lg:grid-cols-3 ">
        {products &&
          products.map((item) => (
            <ProductCard
              name={item.product_name}
              description={item.description}
              image={item.image}
            />
          ))}
      </section>
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

function ProductCard({ name, description, image }) {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={image} className="h-80 w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getProducts(setProducts, setLoading) {
  setLoading(true);
  const snapshot = await getDocs(collection(firestore, "test_images"));
  let query = [];

  console.log(snapshot);

  snapshot.forEach((data) => {
    query.push(data.data());
  });

  setProducts(query);
  setLoading(false);
}

export default Home;
