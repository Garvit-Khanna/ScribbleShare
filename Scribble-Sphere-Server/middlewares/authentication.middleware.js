import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

const authenticate=async (req,res,next)=>{
    console.log(req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Authentication required' });
    }
    try{
        const decodedToken=jwt.verify(token,process.env.SECRET_KEY);
        console.log(decodedToken);
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        req.user=user;
        next();
    }catch(err){
        res.status(401).json({ message: 'Invalid token' });
    }
};
export {authenticate}