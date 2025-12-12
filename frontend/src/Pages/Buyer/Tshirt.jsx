import React, { useState, useRef, useEffect,useContext } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import HeartToggle from "./HeartToggle";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";


const Tshirt = () => {

  const { addToWishlist } = useContext(WishlistContext);
 
  const[productData,setproductData]=useState([])

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  const navigate=useNavigate()

  // const imageRef = useRef(null);
  const imageRefs = useRef([]); 

  useEffect(()=>{
    const res=axios.get("http://localhost:5000/api/product/load-product")
    .then((res)=>setproductData(res.data.product))
    .catch((err)=>{
        console.error("Error fetching products:", err);
      });
  },[])

  //========================Item View=====================================

   const handleClick = (item) => {
  navigate(`/tshirt/${item._id}`, { state: item });
};

  // ---------- ADD TO CART FLOATING ANIMATION ----------
  const flyToCart = (imgElement) => {
    const cartIcon = document.getElementById("cart-icon");

    if (!cartIcon || !imgElement) return;

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = imgElement.cloneNode(true);
    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition =
      "all 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)";
    flyingImg.style.zIndex = 9999;
    flyingImg.style.borderRadius = "12px";

    document.body.appendChild(flyingImg);

    setTimeout(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = "0.5";
    }, 50);

    setTimeout(() => flyingImg.remove(), 900);
  };

  // ---------- QUICK VIEW ----------
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  return (
    <>
      <Header />

        <h1 className="text-4xl font-bold text-center my-9">Latest Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-8">
      

        {productData.map((item, index) => (
  <div key={index} className="relative bg-white shadow-lg rounded-xl p-4 transition-all duration-300 hover:shadow-2xl">

    <img
      src={`http://localhost:5000/uploads/${item.image[0]}`}
      alt={item.name}
      className="rounded-lg w-full h-60 object-scale-down hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={() => openQuickView(item)}
      ref={(el) => (imageRefs.current[index] = el)} // assign ref
    />

    <div className="flex items-center justify-between mt-3">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
        <HeartToggle product={item}/>
      </div>
    </div>

    <p className="text-gray-600">${item.price}</p>

    <button
      onClick={() => flyToCart(imageRefs.current[index])} // pass correct image element
      className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-all"
    >
      Add to Cart
    </button>

    {/* <button
      onClick={() => openQuickView(item)}
      className="mt-3 w-full border border-black py-2 rounded-lg hover:bg-black hover:text-white transition-all"
    >
      Quick View
    </button> */}

    <button
      onClick={() =>handleClick(item)}
      className="mt-3 w-full border border-black py-2 rounded-lg hover:bg-black hover:text-white transition-all"
    >
      View
    </button>

  </div>
))}

      </div>

      {/* ---------- QUICK VIEW MODAL ---------- */}
      {/* <Dialog
        header={selectedProduct?.title}
        visible={visible}
        style={{ width: "35rem" }}
        onHide={() => setVisible(false)}
        breakpoint="768px"
      >
        {selectedProduct && (
          <div className="flex flex-col gap-4">
            <img
              src={selectedProduct.image[0]}
              alt="Quick View"
              className="rounded-lg w-full h-72 object-cover"
               ref={(el) => (item.imgElement = el)}
            />

            <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
            <p className="text-gray-600">{selectedProduct.price}</p>

            <Button
              label="Add to Cart"
              icon="pi pi-shopping-cart"
              className="p-button-rounded p-button-danger"
            />
          </div>
        )}
      </Dialog> */}

      <Footer />
    </>
  );
};

export default Tshirt;
