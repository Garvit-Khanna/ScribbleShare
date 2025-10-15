import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import {sendEmail,createCode} from "../middlewares/email.middleware.js";

const register=async (req,res,next)=>{
    const {username,email,password}=req.body;
    try{
        const checkUser=await User.findOne({email});
        if(checkUser){
            if(checkUser.isVerified)
                return res.status(409).json({error:"Email is already registered."});
            else await User.deleteOne({email:email});
        }
        const hashedPassword=await bcrypt.hash(password,Number(process.env.SALT_ROUNDS));
        const code=createCode();
        const mailOption={
            from: process.env.EMAIL,
            to: email,
            subject: "Verification code from scribble sphere.",
            text: `Hi ${username},\nThank you for your interest in Scribble Sphere.\nPlease confirm your identity by verification code: ${code}`
        };
        await sendEmail(mailOption);
        const user=new User({username:username,email:email,password:hashedPassword,verificationCode:code});
        await user.save();
        res.status(200).json({message:"successfull"});
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to register."});
        next(err);
    }
};

const verify_code=async (req,res,next)=>{
    const {email,code}=req.body;
    try{
        const checkUser=await User.findOne({email});
        if(!checkUser){
            throw new Error("Failed");
        }else{
            if(checkUser.verificationCode != code){
                return res.status(401).json({error:"Wrong verification code."})
            }
            checkUser.set('isVerified',true);
            checkUser.set('verificationCode',"");
            await checkUser.save();
            res.status(200).json({message:"successfull"});
            next();
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to register."});
        next(err);
    }
};

const resend_code=async(req,res,next)=>{
    const {email}=req.body;
    console.log(email)
    try{
        const checkUser=await User.findOne({email});
        console.log(checkUser);
        if(!checkUser){
            throw new Error("Failed");
        }else{
            const code=createCode();
            const mailOption={
                from: process.env.EMAIL,
                to: email,
                subject: "Verification code from scribble sphere.",
                text: `Hi ${checkUser.username},\nThank you for your interest in Scribble Sphere.\nPlease confirm your identity by verification code: ${code}`
            };
            await sendEmail(mailOption);
            checkUser.set('verificationCode',code);
            await checkUser.save();
            res.status(200).json({message:"New Code has been sent to your email."});
            next();
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to generate code."});
        next(err);
    }
};

const login=async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({error:"No such user found."});
        }
        if(user.isGoogleAuth){
            return res.status(409).json({error:"Try to login using google."});
        }
        if(!user.isVerified){
            return res.status(409).json({error:"Your account is not verified.Register Again"});
        }
        const passwordMatch=await user.comparePassword(password);
        if(!passwordMatch){
            return res.status(401).json({error:"Wrong Password."});
        }
        const token= jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        res.status(200).json({username:user.username,token:`Bearer ${token}`});
        next();
    }catch(err){
        next(err);
    }
};

const google=async (req,res,next)=>{
    const {email,username}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(!user){
            //create user
            user=new User({username:username,email:email,password:Date.now(),isGoogleAuth:true,isVerified:true});
            await user.save();
        }
        const token= jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        res.status(200).json({username:user.username,token:`Bearer ${token}`});
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error."});
        next(err);
    }

};

export {register,verify_code,resend_code,login,google};