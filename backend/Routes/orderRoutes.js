import express from 'express'
import { createOrder, getOrder } from '../Controller/orderController.js';

const router=express.Router()

router.post('/create-order',createOrder)
router.get('/get-order',getOrder)


export default router;