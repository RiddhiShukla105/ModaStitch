import jwt from 'jsonwebtoken'

const auth=(req,res,next)=>{

    const token=req.headers.authorization;
    if(!token) return res.status(500).json({success:false,message:"Token not found"})
        try{
            const decode=jwt.verify(token,process.env.SECRET)
            req.user=decode;
            next()
    }catch(error){
        return res.status(500).json({success:false,message:"Invalid token"})
    }

}

export default auth

