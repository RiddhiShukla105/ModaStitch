import express from 'express'
import { createOrder, getOrder, updateOrder, userOrder, createPayPalOrderController,
  verifyPayPalAndCreateOrder } from '../Controller/orderController.js';
import auth from '../Middleware/auth.js';

const router=express.Router()

router.post('/create-order',createOrder)
router.get('/get-order',getOrder)
router.patch('/edit-order/:id',updateOrder)
router.get('/user-order',userOrder)
router.post("/paypal/create",auth,createPayPalOrderController);
router.post("/paypal/verify", auth, verifyPayPalAndCreateOrder);

export default router;