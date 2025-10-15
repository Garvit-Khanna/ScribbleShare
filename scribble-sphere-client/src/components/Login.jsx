import React, { useEffect, useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import Loader from "./Loader";

function Login(props){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPass]=useState(false);
    const [showAlert,setAlert]=useState({show:false,severity:"",message:""});
    const [showLoader,setLoader]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        try{
            if(props.userData.username===""){
                const userData=JSON.parse(localStorage.getItem("userData"));
                if(userData){
                    axios.get(`/api/user/verify`, 
                    {
                        headers: {
                            Authorization: userData.token,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        props.setUserData(userData);
                        props.setLoggedIn(true);
                        console.log(res.data);
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log(err);
                        localStorage.removeItem('userData');
                    })
                }   
            }
        }catch(err){
            console.log(err);
        }
    },[]);
    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoader(true);
            const response=await axios.post("/api/auth/login",{
                email:email,
                password:password
            });
            setLoader(false);
            const userData=response.data;
            setAlert({show:true,severity:"success",message:`Successfully logged in.Welcome ${userData.username}`});
            props.setUserData(userData);
            props.setLoggedIn(true);
            localStorage.setItem('userData',JSON.stringify(userData));
            navigate("/home");
        }catch(err){
            console.log(err);
            setLoader(false);
            setAlert({show:true,severity:"error",message:err.response.data.error});
            props.setLoggedIn(false);
        }
    }
    

    return (
        <div >
            {showAlert.show && <Alert severity={showAlert.severity}>{showAlert.message}</Alert>}
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="w-full">
                <input autoComplete="email webauthn" className="w-full mb-3 p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:rounded-md" value={email} type="email" required={true} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />

                </div>
                <div className="w-full relative">
                <input autoComplete="current-password webauthn" className="w-full mb-3 p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:rounded-md" value={password} type={showPassword?"text":"password"} required={true} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
                <span className="text-gray-700 float-right absolute right-1 top-4" onClick={()=>setShowPass(!showPassword)}>{showPassword?<VisibilityOffIcon />:<VisibilityIcon />}</span>
                </div>
                <Button variant="contained" type="submit" className=" w-full mt-2 p-1 text-xl font-semibold bg-yellow-500 text-white hover:bg-yellow-600 " >Submit</Button>
            </form>
            <Divider className="my-4 font-semibold text-xl">OR</Divider>
            <div className="mb-6">
                <GoogleAuth text="Continue With Google" setLoggedIn={props.setLoggedIn} setUserData={props.setUserData}  />
            </div>
            {showLoader && <Loader />}
        </div>
    );
}

export default Login;