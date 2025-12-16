import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
      userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true   // 🔒 IMPORTANT
  },
    products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      name: { type: String, required: true },
      price: { type: String, required: true },
      qty: { type:String, required: true },
      size: { type: String },
      image: { type: [String] }
    }
  ],
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
     paymentMethod: { type: String, enum: ['cod', 'online'], default: 'cod' },
    pincode:{
        type:String,
        required:true
    },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },

  totalAmount: { type: Number, required: true },

}, { timestamps: true });

export default mongoose.model('order',orderSchema)