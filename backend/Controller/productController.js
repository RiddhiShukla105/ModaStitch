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


// export const loadProduct=async(req,res)=>{
//     try{
//         const product=await Product.find()
//          return res.status(200).json({success:true,message:"Products Found",product})
//     }catch(error){
//         console.log(error)
//         return res.status(500).json({success:false,message:"Backend Error"})
//     }
// }

export const loadProduct = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category; // EXACT match
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      product: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const deleteProduct=async(req,res)=>{
    try{
        const{id}=req.params
        const product=await Product.findByIdAndDelete(id)
         return res.status(200).json({success:true,message:"Products Deleted",product})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}

export const editProduct=async(req,res)=>{
    try{
        const{id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({success:true,message:"Products Updated",product})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}

export const search=(async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(200).json({ products: [] });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
});
