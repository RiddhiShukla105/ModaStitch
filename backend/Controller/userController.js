import express from 'express'
import User from '../Model/useSchema.js'
import bcrypt from 'bcryptjs'
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
        // if(!user_email.password==password){
        //     return res.status(400).json({success:false,message:"Credentails are wrong"})
        // }
         const isMatch = await bcrypt.compare(password, user_email.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password!' });

        return res.status(200).json({message:true,message:"Login Successfull!!"})
    }catch(error){
        console.log(error)
         return res.status(500).json({success:false,message:"Backend Error"})
    }
}