import React, { useRef, useState, useEffect } from "react";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import Options from "../../components/Options";
import toast, { Toaster } from "react-hot-toast";
import { useSelected } from "../../context/FormContext";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useLoader } from "../../context/LoaderContext";
import { useUser } from "../../context/RoleContext";
import Default from "/default-addProduct.jpg";

function AddProduct() {
  const { loading } = useLoader();

  return (
    <div className="flex h-screen font-[Ubuntu]">
      <Toaster />
      {loading && <Spinner />}
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
  const skuRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const discountRef = useRef();
  const qualityRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const imageUrlRef = useRef();

  const { setLoading } = useLoader();
  const { selected } = useSelected();
  const { currentUser } = useUser();

  //state for image preview
  const [productImages, setProductImages] = useState([
    {
      id: 1,
      image: Default,
      switched: false,
    },
    {
      id: 2,
      image: Default,
      switched: false,
    },
    {
      id: 3,
      image: Default,
      switched: false,
    },
    {
      id: 4,
      image: Default,
      switched: false,
    },
  ]);

  //state for adding image
  const [images, setImages] = useState([]);

  //* Event for handling changes when the seller uploads an image via Add Image
  const handleImageChange = async () => {
    //* Creates an UPLOAD URL to get the actual path of the image
    //*  This solves the C:/Fakepath Issue
    const file = imageRef.current.files[0];

    if (file) {
      //*Host the uploaded image temporarily
      const imageUrl = URL.createObjectURL(file);
      var hasChanged = false;
      const modified = productImages.map((data) => {
        if (data.switched == false && !hasChanged) {
          data.image = imageUrl;
          data.switched = true;
          hasChanged = true;
        }
        return data;
      });

      //handles the URL of the currently added image
      await getUploadUrl(file, setImages, images);
      setProductImages(modified);
    }
  };

  //async since we are gonna perform requests
  function handleSubmit() {
    addProduct(
      currentUser.uid,
      nameRef,
      descRef,
      selected,
      skuRef,
      priceRef,
      stockRef,
      discountRef,
      qualityRef,
      categoryRef,
      images,
      imageRef,
      setLoading,
      setImages,
      setProductImages
    );
  }
  return (
    <div className="font-[Poppins] flex flex-col items-center gap-7 h-screen overflow-scroll p-5 ">
      <div className="flex items-center justify-around w-full">
        <PageTitle />
        <Button onClick={handleSubmit} />
      </div>

      <section className="flex items-center gap-3">
        <div className="flex flex-col gap-3">
          <section className="shadow-2xl  flex flex-col gap-3 p-4 w-full rounded-xl border  border-gray-500/50">
            <div className="flex gap-2 w-full flex-col  mr-auto ml-auto">
              <h1 className="font-bold text-start text-lg">
                General Information
              </h1>
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
              <div className="flex flex-col gap-2 w-full items-center">
                <label className="font-medium">Available Size</label>
                <Options />
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
          <section className="shadow-2xl grid grid-cols-2 gap-3 p-4 w-full rounded-xl border border-gray-500/50">
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
              <select ref={qualityRef} className="select font-mono">
                <option>New</option>
                <option>Refurbished</option>
                <option>Used</option>
              </select>
            </div>
          </section>
        </div>

        <section className="flex flex-col items-center  gap-5  mb-5 w-full">
          <div className="flex flex-col gap-4 border  border-gray-500/50 p-5 rounded-xl ">
            <label className="text-lg font-bold">Product Image</label>

            <section className="grid grid-cols-2 gap-5 justify-items-center">
              {productImages &&
                productImages.map((data) => (
                  <div className="border rounded-xl w-full border-black/60">
                    <img
                      src={data.image}
                      alt=""
                      className="rounded-xl  h-50 mr-auto ml-auto w-full"
                    />
                  </div>
                ))}
            </section>

            <button className="btn btn-neutral relative cursor-pointer">
              Add Image <i class="fa-solid fa-image cursor-pointer"></i>
              {/*
               * Added opacity-0 to remove visibility to the input while maintaining its interactivity
               * Relative to the parent element (button) and absolute to the actual input
               */}
              <input
                id="image"
                accept="image/*"
                ref={imageRef}
                type="file"
                className="opacity-0 absolute cursor-pointer"
                onChange={() => handleImageChange()}
              />
            </button>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border  border-gray-500/50 w-full p-2">
            <label className="font-medium">Product Category</label>
            <select
              ref={categoryRef}
              defaultValue="Product Category"
              className="select font-mono"
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
  seller_id,
  nameRef,
  descRef,
  selected,
  skuRef,
  priceRef,
  stockRef,
  discountRef,
  qualityRef,
  categoryRef,
  images,
  imageRef,
  setLoading,
  setImages,
  setProductImages
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
    !selected ||
    !priceRef.current.value ||
    !stockRef.current.value ||
    !qualityRef.current.value ||
    !images ||
    !categoryRef.current.value
  ) {
    notifyEmpty();
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    const docRef = await addDoc(collection(firestore, "products"), {
      seller_id: seller_id,
      product_name: nameRef.current.value,
      description: descRef.current.value,
      size: selected,
      sku: skuRef.current.value || null,
      price: priceRef.current.value,
      stock: stockRef.current.value,
      discount: discountRef.current.value || null,
      quality: qualityRef.current.value,
      image: images,
      category: categoryRef.current.value,
      status: "Available",
    }).then(() => {
      setLoading(false);
      nameRef.current.value = "";
      descRef.current.value = "";
      skuRef.current.value = "";
      imageRef.current.value = "";
      priceRef.current.value = "0";
      stockRef.current.value = "0";
      discountRef.current.value = "0";
      notifySuccess();

      //* Resets the state that holds the links and the preview
      setImages([]);
      setProductImages([
        {
          id: 1,
          image: Default,
          switched: false,
        },
        {
          id: 2,
          image: Default,
          switched: false,
        },
        {
          id: 3,
          image: Default,
          switched: false,
        },
        {
          id: 4,
          image: Default,
          switched: false,
        },
      ]);
    });
  } catch (error) {
    console.log(error);
  }
}

//TODO : Curently Testing The Image Upload using url
async function getUploadUrl(imageUrl, setImages, images) {
  try {
    if (images.length == 4) return;

    const file = imageUrl;
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

    setImages([...images, url]);
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
