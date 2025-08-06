import React, { useState, useEffect } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { getAllProduct } from "../../firebase/products";
ModuleRegistry.registerModules([AllCommunityModule]);

//Currently following along this tutorial
//https://www.youtube.com/watch?v=Pr__B6HM_s4
function TrackProduct() {
  //Setting the data into states gives us the ability to change or modify the data
  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "product_name", headerName: "Product Name" },
    { field: "price", headerName: "Product Price" },
    { field: "stock", headerName: "Product Stock" },
    {
      field: "status",
      headerName: "Status",
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

  useEffect(() => {
    if (rowData) {
      console.log(rowData);
    }
  }, [rowData]);

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default TrackProduct;
