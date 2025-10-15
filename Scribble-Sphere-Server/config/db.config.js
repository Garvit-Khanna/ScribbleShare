import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("database connected");
    }catch(err){
        console.log("Database connection failed..",err);
    }
}

export default connectDb;