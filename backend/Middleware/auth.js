// import jwt from 'jsonwebtoken'

// const auth=(req,res,next)=>{

//     const token=req.headers.authorization;
//     if(!token) return res.status(500).json({success:false,message:"Token not found"})
//         try{
//             const decode=jwt.verify(token,process.env.SECRET)
//             req.user=decode;
//             next()
//     }catch(error){
//         return res.status(500).json({success:false,message:"Invalid token"})
//     }

// }

// export default auth

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ FIX
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
