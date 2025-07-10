import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Empty from "../assets/svg/empty-cart.svg";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useLoader } from "../context/LoaderContext";
import { useSpinner } from "../context/LoaderContext";
import { motion } from "motion/react";

function Home() {
  //state for loading and products list
  const [products, setProducts] = useState();
  const { loading, setLoading } = useLoader();

  const { spinning } = useSpinner();

  //TODO : Fix Cart Undefined Problem , Fix adding mechanism
  //TODO: Currently Working on Add To Cart

  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return (
    <div className="font-[Poppins]">
      <Navbar />

      {loading && <Loader />}
      {spinning && <Spinner />}

      {!products && !loading && <EmptyCart />}
      <section className="p-2 grid grid-cols-2 justify-items-center mt-4 gap-1 mb-5 md:grid-cols-3  lg:grid-cols-4 w-full">
        {products &&
          products.map((item) => (
            <Link to={`productinfo/${item.prodId}`} className="w-full">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ProductCard
                  name={item.product_name}
                  description={item.description}
                  image={item.image}
                  price={item.price}
                />
              </motion.button>
            </Link>
          ))}
      </section>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className=" items-center mt-15 flex flex-col gap-4 justify-center">
      <img src={Empty} className="h-80" alt="" />
      <h2 className="font-bold text-2xl">Store is Currently Empty</h2>
    </div>
  );
}

function ProductCard({ name, description, image, price }) {
  return (
    <div className="card bg-base-100 h-100 w-[90%] shadow-sm mb-7 cursor-pointer">
      <figure>
        <img src={image} className="h-80 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <p className="text-green-600 self-end font-bold text-xl">${price}</p>
        </div>
      </div>
    </div>
  );
}

async function getProducts(setProducts, setLoading) {
  //sets the loading state
  setLoading(true);
  const snapshot = await getDocs(collection(firestore, "products"));
  let query = [];
  snapshot.forEach((data) => {
    const products = data.data();
    products.prodId = data.id;

    query.push(products);
  });

  //sets the state and stops the loadingx
  setProducts(query);
  setLoading(false);
}

export default Home;
