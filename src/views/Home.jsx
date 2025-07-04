import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Empty from "../assets/svg/empty-cart.svg";
import Loader from "../components/Loader";
import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { addToCart, isExisting } from "../firebase/products";
import { useLoader } from "../context/LoaderContext";
import { auth } from "../firebase/config";
import { useUser } from "../context/RoleContext";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  //state for loading and products list
  const [products, setProducts] = useState();
  const { loading, setLoading } = useLoader();
  //! State duplication happens in this component
  const { currentUser } = useUser(auth.currentUser);
  //* Handles and saves the current cart
  const { cart, setCart } = useCart();

  //! Also triggers in other components
  useEffect(() => {
    if (cart.length != 0) {
      const user = auth.currentUser;
      addToCart(user.uid, cart);
    }
  }, [cart]);

  //TODO: Currently Working on Add To Cart
  const handleCart = (name, price) => {
    if (!currentUser) {
      toast.error("Please Log In First!");
      return;
    }

    const productDetails = {
      productName: name,
      price: price,
    };

    setCart(() => {
      if (cart) {
        const compressed = isExisting(cart, productDetails);

        //bypass the old item and then insert the new updated item
        if (compressed) {
          const mapped = cart.map((item) => {
            //change the value of the spot to the new one
            if (item.productName === compressed.productName) {
              return { ...item, price: compressed.price };
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

  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return (
    <div className="font-[Poppins]">
      <Toaster />
      <Navbar />
      {loading && <Loader />}

      {!products && !loading && <EmptyCart />}
      <section className="p-2 grid grid-cols-2 justify-items-center mt-4 gap-8 mb-5 md:grid-cols-2  lg:grid-cols-3 ">
        {products &&
          products.map((item) => (
            <ProductCard
              name={item.product_name}
              description={item.description}
              image={item.image}
              price={item.price}
              onClick={handleCart}
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
      <h2 className="font-bold text-2xl">Store is Currently Empty</h2>
    </div>
  );
}

function ProductCard({ name, description, image, price, onClick }) {
  return (
    <div>
      <div className="card bg-base-100 h-100 w-full shadow-sm">
        <figure>
          <img src={image} className="h-80 w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <p className="text-green-600 self-end font-bold text-xl">
              ${price}
            </p>
            <div className="flex self-end gap-3 items-center">
              <button className="btn btn-primary ">Buy Now</button>
              <button
                className="btn btn-neutral"
                onClick={() => onClick(name, price)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getProducts(setProducts, setLoading) {
  setLoading(true);
  const snapshot = await getDocs(collection(firestore, "products"));
  let query = [];
  snapshot.forEach((data) => {
    query.push(data.data());
  });

  setProducts(query);
  setLoading(false);
}

export default Home;
