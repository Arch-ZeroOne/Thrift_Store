import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { getAllProduct } from "../../firebase/products";
import { NavLink } from "react-router-dom";
ModuleRegistry.registerModules([AllCommunityModule]);

//Currently following along this tutorial
//* Youtube Channel Link
//https://www.youtube.com/watch?v=Pr__B6HM_s4
function TrackProduct() {
  //default styles for the table header
  const header_style = {
    fontFamily: "Poppins",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  //Setting the data into states gives us the ability to change or modify the data
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    //for checkboxes
    {
      headerName: "Select",
      cellRenderer: CheckboxRenderer,
      headerStyle: header_style,
    },
    {
      field: "image",
      headerName: "Image",
      cellRenderer: ImageRenderer,
      headerStyle: header_style,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      headerStyle: header_style,
      cellRenderer: CenterText,
      flex: 5,
    },
    {
      field: "price",
      headerName: "Price",
      headerStyle: header_style,
      sortable: true,
      filter: true,
      cellRenderer: CenterText,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerStyle: header_style,
      sortable: true,
      filter: true,
      cellRenderer: CenterText,
    },
    {
      field: "status",
      headerName: "Status",
      headerStyle: header_style,
      sortable: true,
      filter: true,
      cellRenderer: BadgeRenderer,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerStyle: header_style,
      cellRenderer: ViewButton,
      width: 200,
    },
  ]);

  //Adds options to the properties of the table
  const defaultColDef = {
    flex: 3,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProduct();
      setRowData(data);
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full flex flex-col gap-5">
      <Header />

      <button className="btn btn-soft btn-primary self-end mr-20">
        <NavLink to={"/admin/addproduct"}>Add New</NavLink>
        <i class="fa-solid fa-arrow-right-long"></i>
      </button>

      <div className="flex justify-center">
        <div style={{ height: 500, width: 950 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowHeight={85}
            rowSelection="multiple"
            context={{
              showProductInfo: (product) => {
                console.log(product);
                const {
                  product_name,
                  image,
                  description,
                  category,
                  price,
                  discount,
                } = product;

                const payload = {
                  product_name,
                  image,
                  description,
                  category,
                  price,
                  discount,
                };

                return payload;
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ImageRenderer(params) {
  const image = params.value[0];

  return (
    <div className="flex items-center justify-center h-full">
      <img className="h-full   w-20 rounded-xl " src={image}></img>
    </div>
  );
}

function CenterText(params) {
  const text = params.value;
  return (
    <p className=" font-[Poppins]  flex items-center justify-center h-full">
      {text}
    </p>
  );
}

function CheckboxRenderer(props) {
  const handleChange = (e) => {};

  return <input type="checkbox"></input>;
}

function BadgeRenderer(params) {
  const text = params.value;
  let style = "";

  if (text === "Available") {
    style = "badge badge-success";
  } else if (text === "Low Stock") {
    style = "badge badge-warning";
  } else {
    style = "badge badge-error";
  }

  return (
    <div
      className={style}
      style={{
        fontFamily: "Poppins",
        color: "white",
        display: "flex",
        marginTop: "30px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {text}
    </div>
  );
}

function ViewButton(props) {
  const [productData, setproductData] = useState();
  const handlePopup = () => {
    const data = props.context.showProductInfo(props.data);
    console.log(data.category);
    setproductData(data);
    const modal = document.getElementById("my_modal_4");
    modal.showModal();
  };

  return (
    <div className="cursor-pointer font-[Poppins]" title="Expand Details">
      <i className="fa-solid fa-eye text-lg" onClick={() => handlePopup()}></i>

      {productData && (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-30 max-w-5xl">
            <h3 className="font-bold text-lg">Product Information</h3>
            <section className="flex items-center gap-5">
              <div>
                <img className="h-50" src={productData.image[0]}></img>
              </div>
              <div>
                <p className="font-bold text-xl"></p>
                <p className="text-2xl font-bold">${}</p>
                <p className="font-medium ">{}</p>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">Category:</h3>
                  <p className="font-bold text-green-500"></p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">Discount:</h3>
                  <p className="font-bold ">
                    <span className="text-green-500 font-bold">{}%</span>
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold"> Stock:</h3>

                  <p className="font-bold ">
                    <span className="text-green-500 font-bold">{}</span>
                  </p>
                </div>
              </div>
            </section>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default TrackProduct;
