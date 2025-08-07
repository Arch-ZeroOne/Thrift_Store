import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Empty from "../../assets/svg/empty-cart.svg";
import Loader from "../../components/Loader";
import Spinner from "../../components/Spinner";
import TrendingCard from "../../components/TrendingCard";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useLoader } from "../../context/LoaderContext";
import { useSpinner } from "../../context/LoaderContext";
import { motion } from "motion/react";

function AllProducts() {
  //state for loading and products list
  const [products, setProducts] = useState();
  const { loading, setLoading } = useLoader();
  const { spinning } = useSpinner();

  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return (
    <div className="font-[Poppins]">
      <Navbar />

      {loading && <Loader />}
      {spinning && <Spinner />}

      {!products && !loading && <EmptyCart />}
      <section className="p-2 grid grid-cols-2 justify-items-center mt-10 gap-5 mb-5 md:grid-cols-3   w-full">
        {products &&
          products.map((item) => (
            <Link to={`productinfo/${item.prodId}`} className="w-full">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingCard
                  name={item.product_name}
                  description={item.description}
                  image={item.image[0]}
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

export default AllProducts;
