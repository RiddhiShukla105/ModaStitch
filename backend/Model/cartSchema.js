import mongoose from 'mongoose'

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      image: String,
      price: String,
      quantity: { type: Number, default: 1 },
      size: String,
    },
  ],
})

export default mongoose.model("Cart", cartSchema);