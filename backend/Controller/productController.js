import Product from "../Model/productSchema.js";


export const createProduct = async (req, res) => {
    try {
        // Collect filenames of all uploaded images
        const images = req.files ? req.files.map(file => file.filename) : [];

        const {
            name,
            category,
            price,
            mqty,
            lqty,
            xlqty,
            sub_category,
            color,
            seo,
            desc
        } = req.body;

        const newProduct = new Product({
            name,
            category,
            price,
            mqty,
            lqty,
            xlqty,
            sub_category,
            color,
            seo,
            desc,
            image: images    // image filenames array
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product saved successfully",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Backend Error",
            error: error.message
        });
    }
};


export const loadProduct=async(req,res)=>{
    try{
        const product=await Product.find()
         return res.status(200).json({success:true,message:"Products Found",product})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}