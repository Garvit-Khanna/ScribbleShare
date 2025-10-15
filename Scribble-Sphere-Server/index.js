import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.config.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import noteRoute from "./routes/note.route.js";
import "./config/passport.config.js";
import passport from "passport";

const app=express();
const port=process.env.port || 3000;

await connectDb();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(passport.initialize());

app.get("/",(req,res)=>res.status(200).json({message:"Visit https://scribblesphere0.vercel.app/"}));

app.use("/api/auth",authRoute);

app.use("/api/user",userRoute);

app.use("/api/note",noteRoute);

app.listen(port,()=>{
    console.log("listening on port :" + port);
});
