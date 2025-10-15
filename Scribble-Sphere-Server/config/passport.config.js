import passport from "passport";
import { Strategy as JWTStrategy,ExtractJwt } from "passport-jwt";
import User from "../models/users.model.js";

passport.use(new JWTStrategy({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.SECRET_KEY
    },async(jwt_payload,done)=>{
        try{
            const user=await User.findById(jwt_payload.userId);
            if(!user){
                return done(null,false,{message:"User does not exist"});
            }
            return done(null,user);
        }catch(err){
            console.log(err);
            done(err,false);
        }
    }
));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});