import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function View(props) {
  const navigate=useNavigate();
  const { state }=useLocation();
  const [edit,setEdit]=useState(false);
  const [content,setContent]=useState();
  const [title,setTitle]=useState();
  useEffect(()=>{
    if(!props.loggedIn || !state){
      navigate("/login");
    }else{
      setContent(state.content);
      setTitle(state.title);
    }
  },[props.loggedIn]);
  async function onEdit(){
    if(edit){
      //save editted content
      console.log(content,title);
      try{
        const response=await axios.put(`/api/note/update/${state.id}`,
        {
          title:title,
          content:content
        },
          {
            headers: {
                'Authorization': props.userData.token,
                'Content-Type': 'application/json',
            },
          }
        );
        props.setNotes(response.data);
      }catch(err){
        if(err.response.status == 401){
          logOut(props.setLoggedIn,props.setUserData);
          navigate("/login");
        }
      }
    }
    setEdit(!edit);
  }
  function onCancel(){
    setEdit(false);
    setContent(state.content);
    setTitle(state.title);
  }
  function handleTitleChange(e){
    const value=e.target.value;
    setTitle(value);
  }
  return (
    <div >
      
      <Header loggedIn={props.loggedIn} username={props.userData.username} setLoggedIn={props.setLoggedIn} setUserData={props.setUserData} />
        <Note
            title={title}
            content={content}
            readOnly={!edit}
            id={state && state.id}
            index={state && state.index}
            theme="snow"
            onEdit={onEdit}
            handleChange={setContent}
            handleTitleChange={handleTitleChange}
            onCancel={onCancel}
            view={true}
        />
      <Footer />
    </div>
  );
}

export default View;