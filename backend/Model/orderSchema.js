// import mongoose from 'mongoose'

// const orderSchema=new mongoose.Schema({
//       userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true   // 🔒 IMPORTANT
//   },
//     products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
//       name: { type: String, required: true },
//       price: { type: String, required: true },
//       qty: { type:String, required: true },
//       size: { type: String },
//       image: { type: [String] }
//     }
//   ],
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:String,
//         required:true
//     },
//     address:{
//         type:String,
//         required:true
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     state:{
//         type:String,
//         required:true
//     },
//     paymentMethod: {
//   type: String,
//   enum: ['cod', 'paypal'],
//   required: true
// },
// paymentStatus: {
//   type: String,
//   enum: ["pending", "paid"],
//   default: "pending"
// },

// paypalOrderId: {
//   type: String
// },
//     pincode:{
//         type:String,
//         required:true
//     },
//     status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },

//   totalAmount: { type: Number, required: true },

// }, { timestamps: true });

// export default mongoose.model('order',orderSchema)

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      size: { type: String },
      image: { type: [String] }
    }
  ],
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },

  // Payment Details
  paymentMethod: {
    type: String,
    enum: ['cod', 'paypal'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paypalOrderId: {  // Order ID returned from PayPal when order is created
    type: String
  },
  paypalTransactionId: { // Captured transaction ID from PayPal
    type: String
  },
  paymentAmount: { // Store amount paid in USD or original currency
    type: Number
  },
  currency: { // Currency of the payment
    type: String,
    default: "USD"
  },

  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },

  totalAmount: { type: Number, required: true }

}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
