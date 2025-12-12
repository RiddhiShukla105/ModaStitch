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

const app=express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));

connectDB()

app.use('/api/user',user)
app.use('/api/product',product)
app.use('/api/cart',cart)
app.use('/api/order',order)



app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))
