import Feedback from "../Model/feedbackSchema.js"
import express from 'express'

export const userfeedback=async(req,res)=>{
    try{
         const { name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }
        const Feedbacks=new Feedback(req.body)
    await Feedbacks.save()
    return res.status(200).json({success:true,message:"Feedback saved",Feedbacks})
    }catch(error){
        return res.status(500).json({success:false,message:"backend error",error})
    }
    
}