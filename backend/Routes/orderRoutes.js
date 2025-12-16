import express from 'express'
import { createOrder, getOrder, updateOrder, userOrder } from '../Controller/orderController.js';

const router=express.Router()

router.post('/create-order',createOrder)
router.get('/get-order',getOrder)
router.patch('/edit-order/:id',updateOrder)
router.get('/user-order',userOrder)


export default router;