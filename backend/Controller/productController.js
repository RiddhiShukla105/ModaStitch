import Product from "../Model/productSchema.js";
import multer from 'multer'

export const createProduct=async(req,res)=>{
    try{
         const product=new Product(req.body)
        await product.save()
        return res.status(200).json({success:true,message:"Product Saved"})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}

export const loadProduct=async(req,res)=>{
    try{
        const product=await Product.find()
         return res.status(200).json({success:true,message:"Products Found",product})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}