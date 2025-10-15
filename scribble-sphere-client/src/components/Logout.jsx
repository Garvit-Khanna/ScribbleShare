
async function logOut(setLoggedIn,setUserData){
    setLoggedIn(false);
    setUserData({username:"",token:""});
    localStorage.removeItem('userData');
}

export default logOut;