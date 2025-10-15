import express from "express";
// import { authenticate } from "../middlewares/authentication.middleware.js";
import passport from "passport";

const router=express.Router();

router.get("/verify",passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.json({ message: `Verified` });
});

export default router;