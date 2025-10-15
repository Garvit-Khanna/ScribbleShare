import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const navigate=useNavigate();
  useEffect(()=>{
    if(props.loggedIn) navigate("/");
  },[]);
  const commonCSS="w-1/2 ring-2 ring-yellow-500 inline-block p-2 m-2 text-xl rounded-md font-semibold font-McLaren";
  const selectedCSS="bg-yellow-500 text-white"
  const [btnBg,setBtnbg]=useState(true);
  return (
    <div >
      
      <Header loggedIn={props.loggedIn} noLogin={true} />
      <div className="grid md:grid-cols-2 md:place-items-center ">

      <div className="hidden md:block text-white font-McLaren">
      <img className="w-40 h-40 cursor-pointer rounded-lg mx-auto mb-3" src="Designer.png" alt="" />
        <h1 className="md:text-2xl lg:text-5xl font-bold mb-1">Welcome To Scribble Sphere</h1>
        <h2 className="md:text-xl lg:text-3xl font-semibold text-center">Your Ultimate Notes Companion!</h2>
        <div className=" mt-4 p-2 grid grid-cols-2 grid-rows-2 place-items-center font-mono gap-5 md:text-lg lg:text-2xl text-yellow-200">
          <h3><DevicesOtherIcon className="text-white"/> User-Friendly Interface</h3>
          <h3><VideoCameraBackIcon className="text-white"/> Multimedia Support</h3>
          <h3><AppRegistrationIcon className="text-white"/> Rich Text Editing</h3>
          <h3><VerifiedUserIcon className="text-white"/> Secure & Private</h3>
          
        </div>
      </div>
      <div className="bg-white rounded-lg mx-3 mt-8 md:p-4 md:w-4/5">
        <div className="w-full flex justify-between m-1 mb-4">
          <button onClick={()=>setBtnbg(true)} className={`${commonCSS} ${btnBg &&  selectedCSS}`}>Login</button>
          <button onClick={()=>setBtnbg(false)} className={`${commonCSS} ${!btnBg &&  selectedCSS}`}>SignUp</button>
        </div>
        <div className="w-full mb-4 h-auto rounded-2xl border-yellow-200 border-b-4"></div>
        {btnBg && <Login userData={props.userData} setLoggedIn={props.setLoggedIn} setUserData={props.setUserData}  />}
        {!btnBg && <SignUp setLoggedIn={props.setLoggedIn} setUserData={props.setUserData} />}
      </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;