import React, { useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useLoader } from "../../context/LoaderContext";
import Spinner from "../../components/Spinner";

import toast, { Toaster } from "react-hot-toast";

function AddProduct() {
  const { loading } = useLoader();

  return (
    <div className="flex h-screen font-[Ubuntu]">
      <Toaster />
      {loading && <Spinner />}
      <Sidebar />
      <div className="w-full flex flex-col gap-2">
        <Header />

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

  const { setLoading } = useLoader();

  //async since we are gonna perform requests
  async function handleSubmit() {
    const url = await getUploadUrl(setLoading, imageRef);

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
      url,
      imageRef,
      setLoading
    );
  }
  return (
    <div className="font-[Poppins] flex flex-col items-center gap-7 h-screen overflow-scroll ">
      <div className="flex items-center justify-around w-full">
        <PageTitle />
        <Button onClick={handleSubmit} />
      </div>
      <section className="shadow-2xl  flex flex-col gap-3 p-4 w-[70%] rounded-xl border  border-gray-500/50">
        <div className="flex gap-2 w-full flex-col  mr-auto ml-auto">
          <h1 className="font-bold text-start text-lg">General Information</h1>
          <label className="font-medium">Product Name</label>
          <input type="text" className="input input-md" ref={nameRef} />
          <label className="font-medium">Product Description</label>
          <textarea
            className="border-1 h-30 rounded-xl border-gray-700 p-3"
            ref={descRef}
          ></textarea>
        </div>

        <p className="validator-hint">Must be between be a valid number</p>
        <div className="flex gap-2 justify-around">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Available Size</label>
            <select
              defaultValue="Available Size"
              className="select select-success"
              ref={sizeRef}
            >
              <option disabled={true}>Pick a Runtime</option>
              <option>XL</option>
              <option>S</option>
              <option>XS</option>
              <option>M</option>
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

          <div className="flex flex-col gap-1 font-[Poppins]">
            <label className="font-medium">Product Category</label>
            <select
              ref={categoryRef}
              defaultValue="Product Category"
              className="select "
            >
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Home and Kitchen</option>
              <option>Automotive</option>
              <option>School Supply</option>
            </select>
          </div>
        </section>
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
  url,
  imageRef,
  setLoading
) {
  const notifySuccess = () => {
    toast.success("Product is Successfully Added!");
  };
  const notifyEmpty = () => {
    toast.error("Please fill out empty values");
  };

  if (
    !nameRef.current.value ||
    !descRef.current.value ||
    !sizeRef.current.value ||
    !priceRef.current.value ||
    !stockRef.current.value ||
    !qualityRef.current.value ||
    !url ||
    !categoryRef.current.value
  ) {
    notifyEmpty();
    setLoading(false);
    return;
  }

  try {
    const docRef = await addDoc(collection(firestore, "products"), {
      product_name: nameRef.current.value,
      description: descRef.current.value,
      size: sizeRef.current.value,
      sku: skuRef.current.value || null,
      price: priceRef.current.value,
      stock: stockRef.current.value,
      discount: discountRef.current.value || null,
      quality: qualityRef.current.value,
      image: url,
      category: categoryRef.current.value,
    }).then(() => {
      setLoading(false);
      nameRef.current.value = "";
      descRef.current.value = "";
      sizeRef.current.value = "";
      skuRef.current.value = "";
      priceRef.current.value = "0";
      stockRef.current.value = "0";
      discountRef.current.value = "0";
      imageRef.current.value = "";
      notifySuccess();
    });
  } catch (error) {
    console.log(error);
  }
}

async function getUploadUrl(setLoading, imageRef) {
  try {
    setLoading(true);
    const file = imageRef.current.files[0];
    if (!file) return;
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

    return url;
  } catch (error) {
    console.log("Error in get upload url");
    console.log(error);
  }
}

function PageTitle() {
  return (
    <section className="self-start">
      <div className="flex items-center gap-2 p-5">
        <i class="fa-solid fa-shop text-xl font-bold"></i>
        <h1 className="text-lg font-bold text-primary">Add Product</h1>
      </div>
    </section>
  );
}

function Button({ onClick }) {
  return (
    <div>
      <button
        class="btn btn-primary rounded-xl w-50 cursor-pointer"
        onClick={onClick}
      >
        <i class="fa-solid fa-plus"></i>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
