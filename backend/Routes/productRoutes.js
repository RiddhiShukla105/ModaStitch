import express from 'express'
import { createProduct, deleteProduct, editProduct, loadProduct, search } from '../Controller/productController.js'
import multer from 'multer'

const router=express.Router()

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { files: 5 }, // Maximum 5 images
//   fileFilter(req, file, cb) {
//     console.log("Incoming field:", file.fieldname);
//     cb(null, true);
//   }
});

// Route for creating a product
router.post(
  "/create-product",
  upload.array("images", 5),   // field name: images
  createProduct
);
router.get('/load-product',loadProduct)
router.delete('/delete-product/:id',deleteProduct)
router.put('/edit-product/:id',editProduct)
router.get('/search',search)

export default router;