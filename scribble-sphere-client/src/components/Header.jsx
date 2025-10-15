import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashBoard from "./DashBoard";

function Header(props){
    return (
        <header className="bg-yellow-500 w-full min-h-16 pl-20 text-white font-extralight text-3xl font-McLaren flex items-center">
            <img className="w-16 h-16 cursor-pointer" src="download.png" alt="" />
            <h1 className="inline-block grow"> 
                Scribble Sphere
            </h1>
            {!props.noLogin && props.loggedIn && <DashBoard username={props.username} setLoggedIn={props.setLoggedIn} setUserData={props.setUserData} />}
            {!props.noLogin && !props.loggedIn && <Link to="/login">
            <button className="text-xl text-slate-900 border-2 rounded-lg p-2 mx-3 hover:bg-[#383838] hover:text-white text-wrap">Login/Signup</button>
            </Link>}
        </header>
    );
}

export default Header;