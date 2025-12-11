import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Cart from "../models/cartSchema.js";

const router=express.Router()

// router.get("/cart", async (req, res) => {

export const getCart=async(req,res)=>{
  try {
    // const userId = getUserIdFromToken(req);
    let cart = await Cart.findOne({ userId });


    if (!cart) cart = await Cart.create({ userId, items: [] });
    // res.status(200).json(cart);
    console.log("Cart found:", cart);
    res.status(200).json(cart);

  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}


// router.post("/cart/add", async (req, res) => {

export const createCart=async(req,res)=>{
  try {
    // const userId = getUserIdFromToken(req);
    const { productId, name, image, price, size, source } = req.body;
    // console.log("Decoded userId:", userId);
    console.log("Adding item:", { productId, name, image, price, size, source });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      console.log("New cart created for:", userId);
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.source === source
    );

    if (existingItem) {
      existingItem.quantity += 1;
      console.log("Quantity increased for existing item");
    } else {
      cart.items.push({ productId, name, image, price, size, source });
      console.log("Item added successfully!");
    }

    await cart.save();
    console.log("Saved Cart:", cart);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(401).json({ error: error.message });
  }
}
