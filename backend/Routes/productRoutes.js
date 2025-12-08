import express from 'express'
import { createProduct, loadProduct } from '../Controller/productController.js'

const router=express.Router()

router.post('/create-product',createProduct)
router.get('/load-product',loadProduct)

export default router;