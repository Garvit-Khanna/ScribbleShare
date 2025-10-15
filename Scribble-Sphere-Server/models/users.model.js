import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {noteSchema} from "./notes.model.js";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
        },
        isGoogleAuth:{
            type:Boolean,
            default:false
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        verificationCode:{
            type:String,
        },
        notes:[noteSchema]
    },
    {
        timestamps:true
    }
);

userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        userSchema.password=await bcrypt.hash(user.password,salt);
        next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
};

const User=mongoose.model('User',userSchema);

export default User;