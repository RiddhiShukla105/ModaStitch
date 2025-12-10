import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    price:{
        type:String
    },
    mqty:{
        type:String
    },
    lqty:{
        type:String
    },
    xlqty:{
        type:String
    },
    sub_category:{
        type:String
    },
    color:{
        type:String
    },
    seo:{
        type:String
    },
    desc:{
        type:String
    },
     image: {
        type: [String] 
    }
})

export default mongoose.model("product",productSchema)