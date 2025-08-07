import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { getAllProduct } from "../../firebase/products";
ModuleRegistry.registerModules([AllCommunityModule]);

//Currently following along this tutorial
//TODO Learning to add buttons in the rows
//https://www.youtube.com/watch?v=Pr__B6HM_s4
function TrackProduct() {
  //Setting the data into states gives us the ability to change or modify the data
  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    {
      field: "product_name",
      headerName: "Product Name",
    },
    {
      field: "price",
      headerName: "Product Price",
      sortable: true,
      filter: true,
    },
    {
      field: "stock",
      headerName: "Product Stock",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: ActionsComponents,
      width: 200,
    },
  ]);

  const defaultColDef = {
    flex: 1,
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
          />
        </div>
      </div>
    </section>
  );
}

function ActionsComponents() {
  return <ViewButton />;
}

function ViewButton() {
  return (
    <div className="cursor-pointer">
      <i
        class="fa-solid fa-eye text-green-500 text-lg"
        title="View Product Details"
      ></i>
    </div>
  );
}

export default TrackProduct;
