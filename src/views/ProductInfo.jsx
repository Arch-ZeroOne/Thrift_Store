import React, { useEffect, useState } from "react";
import { useUser } from "../context/RoleContext";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { getProduct } from "../firebase/products";
import { auth } from "../firebase/config";
import { addToCart, isExisting } from "../firebase/products";
import { getAllCart } from "../firebase/products";
import Navbar from "../components/Navbar";
import InfoCard from "../components/InfoCard";
import toast, { Toaster } from "react-hot-toast";
function ProductInfo() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  //* Handles and saves the current cart
  const { cart, setCart } = useCart();

  //* Holds the current user based on AUTH
  const { currentUser } = useUser();
  useEffect(() => {
    const retrieve = async () => {
      const data = await getProduct(id);
      setCurrentProduct(data);
    };
    retrieve();
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
      quantity: 1,
    };

    console.log(productDetails);

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
    <div>
      <Navbar />
      <Toaster />
      {currentProduct && (
        <InfoCard
          product_name={currentProduct.product_name}
          description={currentProduct.description}
          image={currentProduct.image}
          price={currentProduct.price}
          quality={currentProduct.quality}
          size={currentProduct.size}
          stock={currentProduct.stock}
          onAddCart={handleCart}
        />
      )}
    </div>
  );
}

export default ProductInfo;
