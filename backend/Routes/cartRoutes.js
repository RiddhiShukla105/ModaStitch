import express from 'express'
const router=express.Router()
import { getCart,createCart,updateCartQty,removeCartItem,clearUserCart } from '../Controller/cartController.js';

router.get("/fetch", getCart);
router.post("/add", createCart);
router.post("/update", updateCartQty);
router.post("/remove", removeCartItem);
router.post("/clear", clearUserCart);

export default router;