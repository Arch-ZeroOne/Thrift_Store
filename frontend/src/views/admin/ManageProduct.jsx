import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from "ag-grid-react";
import { getAllProduct } from "../../firebase/products";
import { usePopUp } from "../../context/PopupModalContext";
import Swal from "sweetalert2";

function ManageProduct() {
  const { showModal } = usePopUp();
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    {
      field: "product_name",
      headerName: "Product Name",
    },

    {
      field: "stock",
      headerName: "Stock",
    },
    {
      field: "category",
      headerName: "Product Category",
    },
    {
      field: "price",
      headerName: "Original Price",
    },
    {
      field: "discount",
      headerName: "Discount",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: ActionButtons,
      width: 200,
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProduct();
      setRowData(data);
    };
    getData();
  }, []);

  return (
    <>
      {showModal && <EditModal />}
      <section className="w-full flex flex-col gap-5">
        <Header />
        <div className="flex justify-center w-full">
          <div style={{ height: 500, width: 900 }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
          </div>
        </div>
      </section>
    </>
  );
}

function ActionButtons() {
  return (
    <div className="w-full h-full flex gap-5">
      <EditButton />
      <DeleteButton />
    </div>
  );
}
function EditButton() {
  const { setShowModal } = usePopUp();

  return (
    <div onClick={() => setShowModal(true)} className="cursor-pointer">
      <i class="fa-solid fa-pen-to-square text-lg text-green-500"></i>
    </div>
  );
}

function DeleteButton() {
  const showDeleteModal = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Item",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div onClick={() => showDeleteModal()} className="cursor-pointer">
      <i class="fa-solid fa-trash text-lg text-red-500"></i>
    </div>
  );
}
function EditModal() {
  const showConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <section className="absolute  w-full h-full bg-[rgb(0,0,0,0.5)] z-50 ">
      <div className="flex justify-center items-center relative w-[80%] mr-auto ml-auto">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full  border p-4  h-120 mt-20">
          <div>
            <BackButton />
          </div>
          <section className="grid grid-cols-2 w-full gap-2 mt-5">
            <div className="flex flex-col items-center">
              <label className="label">New Product Name</label>
              <input type="text" className="input" placeholder="Product Name" />
            </div>

            <div className="flex flex-col items-center">
              <label className="label">New Product Description</label>
              <input type="text" className="input" placeholder="Descriptions" />
            </div>

            <div className="flex flex-col items-center">
              <label className="label ">New Product Size</label>
              <select
                defaultValue="Pick a text editor"
                className="select select-primary"
              >
                <option disabled={true}>Pick a new Size Available</option>

                <option value="Extra Small">XS</option>
                <option value="Small">S</option>
                <option value="Medium">M</option>
                <option value="Large">L</option>
                <option value="Extra Large">XL</option>
                <option value="Extra Extra Large">XXL</option>
                <option value="Extra Extra Large">XXXL</option>
                <option value="N/A">NA</option>
              </select>
            </div>

            <div className="flex flex-col items-center">
              <label className="label">New Product SKU (Optional)</label>
              <input type="number" className="input" placeholder="SKU" />
            </div>

            <div className="flex flex-col items-center">
              <label className="label">New Product Price </label>
              <input type="number" className="input" placeholder="Price" />
            </div>

            <div className="flex flex-col items-center">
              <label className="label">Updated Stock</label>
              <input type="number" className="input" placeholder="Stock" />
            </div>

            <div className="flex flex-col items-center">
              <label className="label">Updated Discount</label>
              <input type="number" className="input" placeholder="Stock" />
            </div>

            <div className="flex flex-col items-center">
              <label className="label">Updated Quality</label>
              <select defaultValue="Pick a Quality" className="select">
                <option disabled={true}>Pick a Quality</option>
                <option>New</option>
                <option>Refurbished</option>
                <option>Used</option>
              </select>
            </div>

            <div className="flex flex-col items-center ">
              <label className="label">Updated Category</label>
              <select
                defaultValue="Pick a Category"
                className="select mr-auto ml-auto"
              >
                <option disabled={true}>Pick a newCategory</option>
                <option>Fashion</option>
                <option>Electronics</option>
                <option>Home and Kitchen</option>
                <option>Automotive</option>
                <option>School Supply</option>
              </select>
            </div>
          </section>
          <div className="flex">
            <button
              className="btn btn-neutral mt-4 w-100 ml-auto mr-auto"
              onClick={() => showConfirmation()}
            >
              Update
            </button>
          </div>
        </fieldset>
      </div>
    </section>
  );
}

function BackButton() {
  const { setShowModal } = usePopUp();

  return (
    <section onClick={() => setShowModal(false)}>
      <button class="group flex items-center justify-center relative z-10 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-[#999] outline-none focus-visible:outline-0">
        <svg
          fill="currentColor"
          stroke="none"
          stroke-width="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7 overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&amp;_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
        >
          <path
            class="group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
            d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
          ></path>
          <path
            class="group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
            d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
          ></path>
          <path
            class="group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
            d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
          ></path>
        </svg>
      </button>
    </section>
  );
}

export default ManageProduct;
