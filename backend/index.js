import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import connectDB from './Config/database.js'
dotenv.config();
const PORT=process.env.PORT||8000

/*Controllers */
import user from './Routes/userRoutes.js'
import product from './Routes/productRoutes.js'
import cart from './Routes/cartRoutes.js'
import order from './Routes/orderRoutes.js'
import feedback from './Routes/feedbackRoutes.js'

const app=express()

// app.use(cors())

app.use(cors({
  origin: [
    "http://localhost:5173",      // Vite dev
    "http://localhost:3000",      // React dev
    "https://https://modastitch.com/"   // Hostinger domain
  ],
  credentials: true
}));

app.use(express.json())
app.use('/uploads', express.static('uploads'));

connectDB()

app.use('/api/user',user)
app.use('/api/product',product)
app.use('/api/cart',cart)
app.use('/api/order',order)
app.use('/api/feedback',feedback)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.VITE_PAYPAL_CLIENT_ID);
})



app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))
