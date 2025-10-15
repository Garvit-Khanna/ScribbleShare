import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import View from "./Pages/View"
import LoginPage from "./Pages/LoginPage";

function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [userData,setUserData]=useState({username:"",token:""});
  const [notes, setNotes] = useState([]);
  return (
    <main><div className="relative font-serif min-h-screen bg-[#383838] bg-[url(https://www.transparenttextures.com/patterns/cubes.png)]">
      <BrowserRouter>
            <Routes>
                <Route index element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={userData} setUserData={setUserData} notes={notes} setNotes={setNotes} />} />
                <Route path="/home" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={userData} setUserData={setUserData} notes={notes} setNotes={setNotes} />} />
                <Route path="/view" element={<View loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={userData} setUserData={setUserData} notes={notes} setNotes={setNotes} />} />
                <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={userData} setUserData={setUserData} />} />
            </Routes>
        </BrowserRouter>
    </div></main>
  );
}

export default App;
