import express from 'express'
import User from '../Model/useSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const saltRounds=10;

export const createUser=async(req,res)=>{
    try{
        const {email,password,phone}=req.body;
        if(!email||!password||!phone){
            return res.status(400).json({success:false,message:"All fileds are required"})
        }
        let c_pass=password;
        const hash = await bcrypt.hash(c_pass, saltRounds);

        const user=new User({email,password:hash,phone})
        await user.save();
        return res.status(200).json({success:true,message:"User created!!"})

    }catch(error){
        console.log(error)
         return res.status(500).json({success:false,message:"Backend Error"})
    }
}

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({success:false,message:"All fileds are required"})
        }
        const user_email=await User.findOne({email})

        if(!user_email){
            return res.status(400).json({success:false,message:"Credeatials are wrong!!"})
        }
         const isMatch = await bcrypt.compare(password, user_email.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password!' });

        // Generate JWT
    const payload = { userId: user_email._id, role: user_email.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
      message: 'Login successful!',
      token,
      role: user_email.role,
      user: {
        id: user_email._id,
        name:user_email.name,
        email:user_email.email,
      },
    });
    } catch (error) {
    console.error("LOGIN ERROR →", error);
    return res.status(500).json({ success: false, message: error.message });
}
}

export const getUser=async(req,res)=>{
    try{
        const rec=await User.find({})
        return res.status(200).json(rec);

    }catch(error){
       console.log(error)
         return res.status(500).json({success:false,message:"Backend Error"}) 
    }
}