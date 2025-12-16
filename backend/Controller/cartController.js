import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Cart from "../Model/cartSchema.js";

const router=express.Router()

import jwt from "jsonwebtoken";

const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded._id || decoded.userId; // ✅ FIX
};


export const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    let cart = await Cart.findOne({ userId });

    if (!cart) cart = await Cart.create({ userId, items: [] });

    // Convert backend items → frontend compatible format
    const formattedCart = cart.items.map((i) => ({
      id: i.productId,        // frontend expects `id`
      name: i.name,
      image: i.image,
      price: i.price,
      size: i.size,
      qty: i.quantity,        // convert quantity → qty
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


export const createCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, name, image, price, size } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        name,
        image,
        price,
        size,
        quantity: 1,
      });
    }

    await cart.save();

    const formattedCart = cart.items.map((i) => ({
      id: i.productId,
      name: i.name,
      image: i.image,
      price: i.price,
      size: i.size,
      qty: i.quantity,
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


export const updateCartQty = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, diff } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) throw new Error("Item not found");

    item.quantity = Math.max(1, item.quantity + diff);

    await cart.save();

    const formattedCart = cart.items.map((i) => ({
      id: i.productId,
      name: i.name,
      image: i.image,
      price: i.price,
      size: i.size,
      qty: i.quantity,
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(
      (item) =>
        !(item.productId.toString() === productId && item.size === size)
    );

    await cart.save();

    const formattedCart = cart.items.map((i) => ({
      id: i.productId,
      name: i.name,
      image: i.image,
      price: i.price,
      size: i.size,
      qty: i.quantity,
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};



export const clearUserCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
