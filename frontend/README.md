# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






=========================================================================

import express from "express";
import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 📌 Get wishlist
router.get("/", auth, async (req, res) => {
  let wishlist = await Wishlist.findOne({ userId: req.user.id });
  if (!wishlist)
    wishlist = await Wishlist.create({ userId: req.user.id, items: [] });

  res.json(wishlist);
});

// 📌 Add to wishlist
router.post("/add", auth, async (req, res) => {
  const item = req.body;

  let wishlist = await Wishlist.findOne({ userId: req.user.id });
  if (!wishlist)
    wishlist = await Wishlist.create({ userId: req.user.id, items: [] });

  const exists = wishlist.items.find(
    (i) => i.id === item.id && i.size === item.size
  );

  if (!exists) wishlist.items.push(item);

  await wishlist.save();
  res.json(wishlist);
});

// 📌 Remove from wishlist
router.delete("/:id", auth, async (req, res) => {
  const { size } = req.query;

  const wishlist = await Wishlist.findOne({ userId: req.user.id });

  wishlist.items = wishlist.items.filter(
    (i) => !(i.id === req.params.id && i.size === size)
  );

  await wishlist.save();
  res.json(wishlist);
});

// 📌 Move to cart
router.post("/move-to-cart", auth, async (req, res) => {
  const item = req.body;

  // Add to Cart
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

  const exists = cart.items.find(
    (i) => i.id === item.id && i.size === item.size
  );

  if (exists) exists.qty += 1;
  else cart.items.push({ ...item, qty: 1 });

  await cart.save();

  // Remove from wishlist
  await Wishlist.updateOne(
    { userId: req.user.id },
    {
      $pull: { items: { id: item.id, size: item.size } }
    }
  );

  res.json({ cart });
});

export default router;
=======================================================================

import express from "express";
import Cart from "../models/Cart.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 📌 Get user's cart
router.get("/", auth, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

  res.json(cart);
});

// 📌 Add item to cart
router.post("/add", auth, async (req, res) => {
  const item = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

  const exists = cart.items.find(
    (i) => i.id === item.id && i.size === item.size
  );

  if (exists) {
    exists.qty += 1;
  } else {
    cart.items.push({ ...item, qty: 1 });
  }

  await cart.save();
  res.json(cart);
});

// 📌 Update quantity
router.put("/qty", auth, async (req, res) => {
  const { id, size, diff } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.map((item) =>
    item.id === id && item.size === size
      ? { ...item.toObject(), qty: Math.max(1, item.qty + diff) }
      : item
  );

  await cart.save();
  res.json(cart);
});

// 📌 Remove item from cart
router.delete("/:id", auth, async (req, res) => {
  const { size } = req.query;

  const cart = await Cart.findOne({ userId: req.user.id });

  cart.items = cart.items.filter(
    (i) => !(i.id === req.params.id && i.size === size)
  );

  await cart.save();
  res.json(cart);
});

// 📌 Clear cart
router.delete("/clear/all", auth, async (req, res) => {
  await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { items: [] }
  );
  res.json({ message: "Cart cleared" });
});

export default router;


==============================================================================


import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
