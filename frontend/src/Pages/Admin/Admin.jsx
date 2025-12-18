import React, { useState } from "react";
import axios from "axios";
import Header from "../../Components/Header";

const Admin = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    desc: "",
    price: "",
    color: "",
    category: "",
    sub_category: "",
    seo: "",
    mqty: "",
    lqty: "",
    xlqty: "",
    images: [],
  });

  const handle = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    setFormdata((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(formdata).forEach((key) => {
        if (key !== "images") formData.append(key, formdata[key]);
      });

      formdata.images.forEach((img) => formData.append("images", img));

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product/create-product`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormdata({
        name: "",
        desc: "",
        price: "",
        color: "",
        category: "",
        sub_category: "",
        seo: "",
        mqty: "",
        lqty: "",
        xlqty: "",
        images: [],
      });

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 mt-10">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* NAME */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="Men Black T-shirt"
            />
          </div>

          {/* PRICE */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Price</label>
            <input
              type="text"
              name="price"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="999"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2">Description</label>
            <textarea
              name="desc"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 h-24 resize-none focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter product description..."
            ></textarea>
          </div>

          {/* COLOR */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Color</label>
            <input
              type="text"
              name="color"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="Black"
            />
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Category</label>
            <input
              type="text"
              name="category"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="T-shirt"
            />
          </div>

          {/* SUB CATEGORY */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Sub Category</label>
            <input
              type="text"
              name="sub_category"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="Oversized / Regular"
            />
          </div>

          {/* SEO */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">SEO Keyword</label>
            <input
              type="text"
              name="seo"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="black tshirt men"
            />
          </div>

          {/* M QTY */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">M Qty</label>
            <input
              type="text"
              name="mqty"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="10"
            />
          </div>

          {/* L QTY */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">L Qty</label>
            <input
              type="text"
              name="lqty"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="10"
            />
          </div>

          {/* XL QTY */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">XL Qty</label>
            <input
              type="text"
              name="xlqty"
              onChange={handle}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="10"
            />
          </div>

          {/* IMAGES */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2">Upload Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImage}
              className="p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 mt-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
            >
              Submit Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Admin;
