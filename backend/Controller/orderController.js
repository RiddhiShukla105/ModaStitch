import express from 'express'
import Order from "../Model/orderSchema.js"

export const createOrder=async(req,res)=>{
 try {
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

    const newOrder = new Order({
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
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export const getOrder=async(req,res)=>{
    try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
     res.status(500).json({ message: "Server error" });
   }
}