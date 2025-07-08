import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../firebase/products";
import Navbar from "../components/Navbar";
import InfoCard from "../components/InfoCard";
function ProductInfo() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    const retrieve = async () => {
      const data = await getProduct(id);
      setCurrentProduct(data);
    };
    retrieve();
  }, []);

  return (
    <div>
      <Navbar />
      {currentProduct && (
        <InfoCard
          product_name={currentProduct.product_name}
          description={currentProduct.description}
          image={currentProduct.image}
          quality={currentProduct.quality}
          size={currentProduct.size}
          stock={currentProduct.stock}
        />
      )}
    </div>
  );
}

export default ProductInfo;
