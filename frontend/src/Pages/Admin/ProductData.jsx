import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import "primeicons/primeicons.css";

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  // const load = async () => {
  //   const res = await axios.get("http://localhost:5000/api/product/load-product");
  //   setProducts(res.data.products || res.data || []);
  // };

  const load = async () => {
  const res = await axios.get("http://localhost:5000/api/product/load-product");

  let data = [];

  if (Array.isArray(res.data)) {
    data = res.data;
  } else if (Array.isArray(res.data.products)) {
    data = res.data.products;
  } else if (Array.isArray(res.data.product)) {
    data = res.data.product;
  }

  setProducts(data);
};


  useEffect(() => {
    load();
  }, []);

  const editProduct = (rowData) => {
    setEditData({ ...rowData });
    setVisible(true);
  };

  const DeleteProduct = async (rowData) => {
    await axios.delete(
      `http://localhost:5000/api/product/delete-product/${rowData._id}`
    );
    load();
  };

  const updateProduct = async () => {
    await axios.put(
      `http://localhost:5000/api/product/edit-product/${editData._id}`,
      editData
    );
    setVisible(false);
    load();
  };

  const handleInput = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const srNoTemplate = (_, options) => options.rowIndex + 1;

  const imageBodyTemplate = (rowData) => {
    if (!rowData.image?.length) return <span className="text-gray-400">No Image</span>;
    return (
      <img
        src={`http://localhost:5000/uploads/${rowData.image[0]}`}
        className="w-12 h-12 rounded-md object-cover"
        alt="product"
      />
    );
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-info"
        onClick={() => editProduct(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger"
        onClick={() => DeleteProduct(rowData)}
      />
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">

      {/* HEADER */}
      <div className="flex justify-between items-centermb-4">
       <h2 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
    Product Management
  </h2>

        <div className="flex gap-2">
          <InputText
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="p-inputtext-sm"
          />
          <Button
            icon="pi pi-refresh"
            className="p-button-text"
            onClick={load}
          />
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        value={products}
        paginator
        rows={8}
        stripedRows
        responsiveLayout="scroll"
        globalFilter={globalFilter}
        emptyMessage="No products found"
        className="p-datatable-sm"
      >
        <Column header="#" body={srNoTemplate} style={{ width: "60px" }} />
        <Column field="name" header="Product" sortable />
        <Column field="price" header="Price ₹" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="mqty" header="M" />
        <Column field="lqty" header="L" />
        <Column field="xlqty" header="XL" />
        <Column header="Image" body={imageBodyTemplate} />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>

      {/* EDIT DIALOG */}
      <Dialog
        header="Edit Product"
        visible={visible}
        style={{ width: "420px" }}
        onHide={() => setVisible(false)}
      >
        {editData && (
          <div className="flex flex-col gap-3">
            <InputText name="name" value={editData.name} onChange={handleInput} placeholder="Name" />
            <InputText name="price" value={editData.price} onChange={handleInput} placeholder="Price" />
            <InputText name="category" value={editData.category} onChange={handleInput} placeholder="Category" />

            <div className="grid grid-cols-3 gap-2">
              <InputText name="mqty" value={editData.mqty} onChange={handleInput} placeholder="M Qty" />
              <InputText name="lqty" value={editData.lqty} onChange={handleInput} placeholder="L Qty" />
              <InputText name="xlqty" value={editData.xlqty} onChange={handleInput} placeholder="XL Qty" />
            </div>

            {editData.image?.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/${editData.image[0]}`}
                className="w-28 rounded-md mt-2"
                alt="preview"
              />
            )}

            <Button label="Update Product" icon="pi pi-check" onClick={updateProduct} />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ProductData;
