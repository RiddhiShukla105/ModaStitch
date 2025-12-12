import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role: { type: String, enum: ["buyer", "admin"], default: "buyer" }
})

export default mongoose.model('user',userSchema)