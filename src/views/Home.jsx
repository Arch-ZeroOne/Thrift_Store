import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Empty from "../assets/svg/empty-cart.svg";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { addToCart, isExisting } from "../firebase/products";
import { useLoader } from "../context/LoaderContext";
import { auth } from "../firebase/config";
import { useUser } from "../context/RoleContext";
import { useCart } from "../context/CartContext";
import { useSpinner } from "../context/LoaderContext";
import { getAllCart } from "../firebase/products";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

function Home() {
  //state for loading and products list
  const [products, setProducts] = useState();
  const { loading, setLoading } = useLoader();

  //* Handles and saves the current cart
  const { cart, setCart } = useCart();
  //* Holds the current user based on AUTH
  const { currentUser } = useUser();
  const { spinning } = useSpinner();

  //TODO : Fix Cart Undefined Problem , Fix adding mechanism
  //TODO: Currently Working on Add To Cart

  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  useEffect(() => {
    if (cart && currentUser) {
      const user = auth.currentUser;
      addToCart(user.uid, cart);
    }
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      //retrieves old saved cart data of user from firebase
      const retreiveOld = async () => {
        const data = await getAllCart(currentUser.uid);
        if (data) {
          setCart(data);
        }
      };
      retreiveOld();
    }
  }, [currentUser]);

  const handleCart = (name, price, image, newQuantity) => {
    if (!currentUser) {
      toast.error("Please Log In First!");
      return;
    }

    const productDetails = {
      productName: name,
      price: price,
      image: image,
      quantity: newQuantity,
    };

    setCart(() => {
      if (cart) {
        const compressed = isExisting(cart, productDetails);

        //bypass the old item and then insert the new updated item
        if (compressed) {
          const mapped = cart.map((item) => {
            //change the value of the spot to the new one
            if (item.productName === compressed.productName) {
              return {
                ...item,
                price: compressed.price,
                quantity: compressed.quantity,
              };
            }

            return item;
          });

          return mapped;
        }
      }

      return [...cart, productDetails];
    });

    toast.success("Product Added to Cart");
  };

  return (
    <div className="font-[Poppins]">
      <Toaster />
      <Navbar />

      {loading && <Loader />}
      {spinning && <Spinner />}

      {!products && !loading && <EmptyCart />}
      <section className="p-2 grid grid-cols-2 justify-items-center mt-4 gap-1 mb-5 md:grid-cols-3  lg:grid-cols-4 ">
        {products &&
          products.map((item) => (
            <Link to={`productinfo/${item.prodId}`}>
              <ProductCard
                name={item.product_name}
                description={item.description}
                image={item.image}
                price={item.price}
                onClick={handleCart}
              />
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

function ProductCard({ name, description, image, price, onClick }) {
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
          <div className="flex self-end gap-3 items-center">
            <button
              className="btn btn-soft  rounded-4xl "
              onClick={() => onClick(name, price, image, 1)}
            >
              Add To Cart
            </button>
          </div>
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
