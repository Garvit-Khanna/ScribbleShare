import React, { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ReactPasswordChecklist from "react-password-checklist";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { GoogleAuth } from "./GoogleAuth";
import VerificationInput from "./VerificationInput";
import Loader from "./Loader";

function SignUp(props){
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password1,setPassword1]=useState("");
    const [password2,setPassword2]=useState("");
    const [showPassword1,setShowPass1]=useState(false);
    const [showPassword2,setShowPass2]=useState(false);
    const [isValidPassword,setIsValidPassword]=useState(false);
    const [showAlert,setAlert]=useState({show:false,severity:"",message:""});
    const [verifyCode,setVerifyCode]=useState(false);
    const [showLoader,setLoader]=useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(!isValidPassword) return;
        
        try{
            setLoader(true);
            const response=await axios.post("/api/auth/register",{
                username:username,
                email:email,
                password:password1
            });
            setLoader(false);
            setAlert({show:true,severity:"success",message:"verfication code sent to your email."});
            setVerifyCode(true);
        }catch(err){
            console.log(err);
            setLoader(false);
            setAlert({show:true,severity:"error",message:err.response.data.error});
        }
    }

    async function handleCode(code){
        console.log(code);
        try{
            setLoader(true);
            const response=await axios.post("/api/auth/verify_code",{
                email:email,
                code:code
            });
            setLoader(false);
            setAlert({show:true,severity:"success",message:"Successfully registered.Please login to your account."});
            setVerifyCode(false);
        }catch(err){
            console.log(err);
            setLoader(false);
            setAlert({show:true,severity:"error",message:err.response.data.error});
        }
    }

    async function handleResendCode(){
        try{
            setLoader(true);
            const response=await axios.post("/api/auth/resend_code",{
                email:email
            });
            setLoader(false);
            setAlert({show:true,severity:"success",message:response.data.message});
            setVerifyCode(true);
        }catch(err){
            console.log(err);
            setLoader(false);
            setAlert({show:true,severity:"error",message:err.response.data.error});
        }
    }

    return (
        
        <div className="relative" >
        
        <div>
        {showAlert.show && <Alert severity={showAlert.severity}>{showAlert.message}</Alert>}
        {verifyCode===false?
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="w-full">
                    <input className="w-full mb-3 p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:rounded-md" value={username} type="text" required={true} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter Name" autoComplete="name webauthn" />
                </div>
                
                <div className="w-full">
                <input className="w-full mb-3 p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:rounded-md" value={email} type="email" required={true} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" autoComplete="email webauthn" />

                </div>
                <div className="w-full relative">
                <input className="w-full mb-3 p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:rounded-md" value={password1} type={showPassword1?"text":"password"} autoComplete="new-password webauthn" required={true} onChange={(e)=>setPassword1(e.target.value)} placeholder="Enter Password" />
                <span className="text-gray-700 float-right absolute right-1 top-4" onClick={()=>setShowPass1(!showPassword1)}>{showPassword1?<VisibilityOffIcon />:<VisibilityIcon />}</span>
                </div>
                <div className="w-full relative">
                <input className="w-full mb-3 p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:rounded-md" value={password2} type={showPassword2?"text":"password"} autoComplete="new-password webauthn" required={true} onChange={(e)=>setPassword2(e.target.value)} placeholder="Confirm Password" />
                <span className="text-gray-700 float-right absolute right-1 top-4" onClick={()=>setShowPass2(!showPassword2)}>{showPassword2?<VisibilityOffIcon />:<VisibilityIcon />}</span>
                </div>
                {password1 && 
                    <ReactPasswordChecklist 
                        rules={["minLength","number","specialChar","capital","lowercase","match"]}
                        minLength={8}
                        value={password1}
                        valueAgain={password2}
                        onChange={(isValid)=>{setIsValidPassword(isValid)}}
                        className="grid grid-cols-2"
                     />}
                <Button variant="contained" type="submit" className="w-full text-center mt-2 p-1 text-xl font-semibold bg-yellow-500 text-white hover:bg-yellow-600 " >Submit</Button>
            </form>
            <Divider className="mt-4 font-semibold text-xl">OR</Divider>
            <div className="mb-6">
                <GoogleAuth text="Signin with Google" setLoggedIn={props.setLoggedIn} setUserData={props.setUserData} />
            </div></div>:
            <VerificationInput callback={handleCode} handleResendCode={handleResendCode} />
        }
        </div>
        {showLoader && <Loader />}
        </div>

    );
}

export default SignUp;