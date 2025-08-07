import { useState } from "react";
import Header from "../../components/Header";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from "ag-grid-react";
function ManageProduct() {
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
    },
  ]);

  return (
    <div className="w-full">
      <Header />
      <div style={{ height: 500, width: 900 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}

export default ManageProduct;
