import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { getAllProduct } from "../../firebase/products";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
ModuleRegistry.registerModules([AllCommunityModule]);
export const header_style = {
  fontFamily: "Ubuntu",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
//Currently following along this tutorial
//* Youtube Channel Link
//https://www.youtube.com/watch?v=Pr__B6HM_s4
function TrackProduct() {
  //default styles for the table header

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
            popupParent={document.body}
          />
        </div>
      </div>
    </section>
  );
}

export function ImageRenderer(params) {
  const image = params.value[0];

  return (
    <div className="flex items-center justify-center h-full">
      <img className="h-full   w-18 rounded-4xl " src={image}></img>
    </div>
  );
}

export function CenterText(params) {
  const text = params.value;
  return (
    <p className=" font-[Ubuntu]  flex items-center justify-center h-full">
      {text}
    </p>
  );
}

function CheckboxRenderer(props) {
  const handleChange = (e) => {};

  return (
    <div className="flex items-center justify-center h-full">
      <input type="checkbox"></input>
    </div>
  );
}

export function BadgeRenderer(params) {
  const text = params.value;
  let style = "";

  if (text === "Available") {
    style = "badge badge-soft badge-success";
  } else if (text === "Low Stock") {
    style = "badge badge-soft badge-warning";
  } else {
    style = "badge badge-soft badge-error";
  }

  return (
    <div
      className={style}
      style={{
        fontFamily: "Ubuntu",
        display: "flex",
        marginTop: "30px",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      {text}
    </div>
  );
}

export function ViewButton() {
  return (
    <div className="w-full flex justify-center h-full items-center">
      <button
        className="hover:opacity-50 cursor-pointer"
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>

      <ul
        className="dropdown menu  rounded-box bg-base-100 shadow-sm font-[Ubuntu]"
        popover="auto"
        id="popover-1"
        style={{ width: "300px", display: "flex", alignItems: "center" }}
      >
        <li>
          <a>Copy Product ID</a>
        </li>
        <li>
          <a>Edit Product</a>
        </li>
        <li>
          <a>View Product</a>
        </li>
      </ul>
    </div>
  );
}

export default TrackProduct;
