import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin,googleLogout } from '@react-oauth/google';
import { Button } from '@mui/material';
import axios from 'axios';

const GoogleAuth=(props)=> {
    const [ user, setUser ] = useState({});
    const [ profile, setProfile ] = useState({});
    const navigate=useNavigate();
    const handleGoogleLogin= useGoogleLogin({
        onSuccess: credentialResponse => setUser(credentialResponse),
        onError: err => console.log(err)
    });
    useEffect(()=>{
        console.log(user);
        if(profile.id){
            console.log(profile);
            axios.post("/api/auth/google",{
                email:profile.email,
                username:profile.name
            }).then((res)=>{
                console.log(res);
                props.setUserData(res.data);
                props.setLoggedIn(true);
                navigate("/");
            }).catch((err)=>{
                console.log(err);
                props.setUserData("");
                props.setLoggedIn(false);
            })
        }
        else if (user.access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, 
            {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        }
    },[user,profile]);
    return (
        <Button variant="outlined" onClick={handleGoogleLogin}  className=" w-full mt-2 p-1 text-lg text-black border-yellow-300 hover:bg-gray-100 hover:border-yellow-300" ><img src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google.png" className="w-6 h-6 mr-3" />{props.text}</Button>
    )
}
export { GoogleAuth };