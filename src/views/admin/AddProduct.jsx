import React, { useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Overview from "../../components/Overview";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

function AddProduct() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-col gap-2">
        <Header />
        <Overview path="Add Product" />
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const nameRef = useRef();
  const descRef = useRef();
  const sizeRef = useRef();
  const skuRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const discountRef = useRef();
  const qualityRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  //async since we are gonna perform requests
  async function handleSubmit() {
    const url = getUploadUrl(imageRef);
    addProduct(
      nameRef,
      descRef,
      sizeRef,
      skuRef,
      priceRef,
      stockRef,
      discountRef,
      qualityRef,
      categoryRef,
      url
    );
  }
  return (
    <div className="font-[Ubuntu] flex flex-col items-center gap-7 h-screen overflow-scroll ">
      <section className="shadow-2xl  flex flex-col gap-3 p-4 w-[70%] rounded-xl border  border-gray-500/50">
        <div className="flex gap-2 w-full flex-col items-center mr-auto ml-auto">
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            className="input input-md"
            ref={nameRef}
          />
          <label className="font-medium">Product Description</label>
          <textarea
            placeholder="Product Description"
            className="textarea textarea-neutral"
            ref={descRef}
          ></textarea>
        </div>

        <p className="validator-hint">Must be between be a valid number</p>
        <div className="flex gap-2 justify-around">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Available Size</label>
            <select
              ref={sizeRef}
              defaultValue="Pick Available Size"
              className="select"
            >
              <option>XL</option>
              <option>S</option>
              <option>M</option>
              <option>XL</option>
              <option>XXL</option>
              <option>N/A</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">SKU(Optional)</label>
            <input
              type="text"
              placeholder="SKU(Optional)"
              className="input input-md"
              ref={skuRef}
            />
          </div>
        </div>
      </section>
      <section className="shadow-2xl grid grid-cols-2 gap-3 p-4 w-[70%] rounded-xl border border-gray-500/50">
        <div className="flex flex-col  gap-1">
          <label className="font-medium">Price</label>
          <input
            type="text"
            defaultValue="0"
            ref={priceRef}
            className="input input-md"
          />
        </div>
        <div className="flex flex-col  gap-1">
          <label className="font-medium">Stock</label>
          <input
            ref={stockRef}
            type="text"
            defaultValue="0"
            className="input input-md"
          />
        </div>
        <div className="flex flex-col  gap-1">
          <label className="font-medium">Discount(%)</label>
          <input
            ref={discountRef}
            type="text"
            defaultValue="0"
            className="input input-md"
          />
        </div>
        <div className="flex flex-col  gap-1">
          <label className="font-medium">Quality</label>
          <select ref={qualityRef} className="select">
            <option>New</option>
            <option>Refurbished</option>
            <option>Used</option>
          </select>
        </div>
      </section>
      <section className="flex flex-col items-center  gap-5 justify-center mb-5">
        <section className="flex  gap-5">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Product Image</label>
            <input
              id="image"
              accept="image/*"
              type="file"
              className="file-input file-input-neutral"
              ref={imageRef}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Product Category</label>
            <select
              ref={categoryRef}
              defaultValue="Product Category"
              className="select"
            >
              <option value="clothing">Clothing</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
              <option value="home_appliances">Home Appliances</option>
              <option value="furniture">Furniture</option>
              <option value="kitchenware">Kitchenware</option>
              <option value="bedding">Bedding & Linens</option>
              <option value="personal_care">Personal Care Products</option>
              <option value="cleaning_supplies">Cleaning Supplies</option>
              <option value="decor">Home Decor</option>
            </select>
          </div>
        </section>

        <button
          class="btn btn-neutral rounded-xl w-80 cursor-pointer"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </section>
    </div>
  );
}

async function addProduct(
  nameRef,
  descRef,
  sizeRef,
  skuRef,
  priceRef,
  stockRef,
  discountRef,
  qualityRef,
  categoryRef,
  url
) {
  console.log(await url);
  try {
    const docRef = await addDoc(collection(firestore, "test_images"), {
      product_name: nameRef.current.value,
      description: descRef.current.value,
      size: sizeRef.current.value,
      sku: skuRef.current.value || null,
      price: priceRef.current.value,
      stock: stockRef.current.value,
      discount: discountRef.current.value || null,
      quality: qualityRef.current.value,
      image: String(url),
      category: categoryRef.current.value,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getUploadUrl(imageRef) {
  try {
    if (!file) return;
    const file = imageRef.current.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "product_images");
    data.append("cloud_name", "dwuelxoyn");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwuelxoyn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const response = await res.json();
    const { url } = response;
    console.log("called");
    console.log(url);

    return url;
  } catch (error) {}
}

export default AddProduct;
