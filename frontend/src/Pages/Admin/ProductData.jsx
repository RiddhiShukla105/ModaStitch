import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import "primeicons/primeicons.css";

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  // Load products
  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/product/load-product");
    console.log( res.data);

    if (Array.isArray(res.data)) setProducts(res.data);
    else if (Array.isArray(res.data.products)) setProducts(res.data.products);
    else if (Array.isArray(res.data.product)) setProducts(res.data.product);
  };

  useEffect(() => {
    load();
  }, []);

  // Open Edit Form
  const editProduct = (rowData) => {
    setEditData({ ...rowData });
    setVisible(true);
  };

  // Delete
  const DeleteProduct = async (rowData) => {
    await axios.delete(
      `http://localhost:5000/api/product/delete-product/${rowData._id}`
    );
    load();
  };

  // Update Product
  const updateProduct = async () => {
    await axios.put(
      `http://localhost:5000/api/product/edit-product/${editData._id}`,
      editData
    );
    setVisible(false);
    load();
  };

  // Handle Input
  const handleInput = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // SR.NO Template
  const srNoTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Auto numbering
  };

  // IMAGES TEMPLATE (Preview)
const imageBodyTemplate = (rowData) => {
  if (!rowData.image || rowData.image.length === 0) {
    return <span>No Image</span>;
  }

  const img = rowData.image[0]; // first image

  return (
    <img
      src={`http://localhost:5000/uploads/${img}`}
      alt="product"
      style={{
        width: "50px",
        height: "50px",
        objectFit: "cover",
        borderRadius: "6px",
      }}
    />
  );
};



  // ACTION BUTTONS
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="ml-2"
          onClick={() => DeleteProduct(rowData)}
        />
      </>
    );
  };

  return (
    <div className="card">

      {/* TABLE */}
      <DataTable value={products} tableStyle={{ minWidth: "60rem" }}>
        <Column
          header="Sr.No"
          body={srNoTemplate}
          style={{ width: "7%" }}
        />

        <Column field="name" header="Name"  style={{ width: "15%" }} />

        <Column field="price" header="Price" sortable style={{ width: "10%" }} />

        <Column field="category" header="Category" sortable style={{ width: "13%" }} />

        <Column field="mqty" header="M Qty" sortable style={{ width: "8%" }} />
        <Column field="lqty" header="L Qty" sortable style={{ width: "8%" }} />
        <Column field="xlqty" header="XL Qty" sortable style={{ width: "8%" }} />

        {/* IMAGE PREVIEW */}
        <Column header="Image" body={imageBodyTemplate} style={{ width: '10%' }} />

        {/* ACTIONS */}
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "16%" }}
        />
      </DataTable>

      {/* EDIT POPUP */}
      <Dialog
        header="Edit Product"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        {editData && (
          <div className="p-fluid">
            <label>Name</label>
            <input
              name="name"
              value={editData.name}
              onChange={handleInput}
              className="p-inputtext p-component mb-2"
            />

            <label>Price</label>
            <input
              name="price"
              value={editData.price}
              onChange={handleInput}
              className="p-inputtext p-component mb-2"
            />

            <label>Category</label>
            <input
              name="category"
              value={editData.category}
              onChange={handleInput}
              className="p-inputtext p-component mb-2"
            />

            <label>M Qty</label>
            <input
              name="mqty"
              value={editData.mqty}
              onChange={handleInput}
              className="p-inputtext p-component mb-2"
            />

            <label>L Qty</label>
            <input
              name="lqty"
              value={editData.lqty}
              onChange={handleInput}
              className="p-inputtext p-component mb-2"
            />

            <label>XL Qty</label>
            <input
              name="xlqty"
              value={editData.xlqty}
              onChange={handleInput}
              className="p-inputtext p-component mb-2"
            />

            {/* Preview Image Inside Edit Form */}
            <label>Image Preview</label>
            {editData.images && editData.images.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/${editData.images[0]}`}
                alt="preview"
                style={{
                  width: "120px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />
            )}

            <Button label="Update" icon="pi pi-check" onClick={updateProduct} />
          </div>
        )}
      </Dialog>

    </div>
  );
};

export default ProductData;
