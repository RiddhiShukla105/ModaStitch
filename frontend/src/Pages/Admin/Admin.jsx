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
    images: [], // store multiple images
  });

  const handle = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
  const files = Array.from(e.target.files);

  setFormdata((prev) => ({
    ...prev,
    images: [...prev.images, ...files], // ADD instead of replace
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();

    Object.keys(formdata).forEach((key) => {
      if (key !== "images") {
        formData.append(key, formdata[key]);
      }
    });

    // append all images
    formdata.images.forEach((img) => formData.append("images", img));

    await axios.post(
      "http://localhost:5000/api/product/create-product",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // RESET state + input
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
    <div>
    <Header/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" name="name" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input type="text" name="desc" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input type="text" name="price" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Color</label>{" "}
          <input type="text" name="color" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Category</label>
          <input type="text" name="category" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Sub Category</label>
          <input type="text" name="sub_category" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">SEO</label>
          <input type="text" name="seo" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">M Qty</label>
          <input type="text" name="mqty" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">L Qty</label>{" "}
          <input type="text" name="lqty" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Xl Qty</label>
          <input type="text" name="xlqty" onChange={handle} />
        </div>
        <div>
          <label htmlFor="">Image</label>
          <input type="file" name="images" multiple onChange={handleImage} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;
