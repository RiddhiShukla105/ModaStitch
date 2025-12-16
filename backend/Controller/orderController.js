import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import Order from "../Model/orderSchema.js"
import jwt from "jsonwebtoken"



// const getUserIdFromToken = (req) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) throw new Error("No token provided");

//   const token = authHeader.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   return decoded._id || decoded.userId;
// };


const getUserIdFromToken = (req) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization;

  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded.userId;
};


export const createOrder = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const {
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      totalAmount
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ALWAYS create a new order
    const newOrder = new Order({
      userId, // ✅ IMPORTANT
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      totalAmount
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



//for admin to get all orders
export const getOrder=async(req,res)=>{
    try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
     res.status(500).json({ message: "Server error" });
   }
}


//to get user logged in user specific corder
export const userOrder = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const orders = await Order.find({
      userId: decoded.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const updateOrder=async(req,res)=>{
  try{
    const{id}=req.params;
    const{status}=req.body
    const orders=await Order.findByIdAndUpdate(id, { $set: { status: status.toLowerCase() } },{new:true})
    res.status(200).json(orders)

  }catch(error){
    res.status(500).json({message})
  }
}