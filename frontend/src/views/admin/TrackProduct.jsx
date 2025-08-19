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
      cellRenderer: ActionsComponents,
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
      <div className="flex justify-center">
        <div style={{ height: 500, width: 950 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowHeight={85}
            rowSelection="multiple"
          />
        </div>
      </div>
    </section>
  );
}

function ActionsComponents(params) {
  return (
    <div className="flex items-center justify-center h-full">
      <ViewButton />
    </div>
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

function ViewButton() {
  return (
    <div className="cursor-pointer">
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <i
          class="fa-solid fa-eye text-lg"
          title="View Product Details"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        ></i>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
      ;
    </div>
  );
}

export default TrackProduct;
