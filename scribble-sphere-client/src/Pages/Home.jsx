import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logOut from "../components/Logout";

function Home(props) {
  const {notes,setNotes}=props;
  const [isEdit,setEdit]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    if(props.loggedIn){
      axios.get("/api/note/all",{
        headers: {
            Authorization: props.userData.token,
            Accept: 'application/json'
        }
      }).then((response)=>{
        setNotes(response.data);
        setEdit(false);
      }).catch((err)=>{
        if(err.response.status == 401){
          logOut(props.setLoggedIn,props.setUserData);
          navigate("/login");
        }
      })
    }else{
      navigate("/login");
    }
  },[props.userData]);
  async function addNote(newNote) {
    try{
      const response=await axios.post("/api/note/add",newNote,
        {
          headers: {
              'Authorization': props.userData.token,
              'Content-Type': 'application/json',
          },
        }
      );
      setNotes(response.data);
    }catch(err){
      if(err.response.status == 401){
        logOut(props.setLoggedIn,props.setUserData);
        navigate("/login");
      }
    }
  }

  async function deleteNote(id) {
    try{
      const response=await axios.delete(`/api/note/delete/${id}`,
        {
          headers: {
              'Authorization': props.userData.token,
              'Content-Type': 'application/json',
          },
        }
      );
      setNotes(response.data);
    }catch(err){
      if(err.response.status == 401){
        logOut(props.setLoggedIn,props.setUserData);
        navigate("/login");
      }
    }
  }

  async function editNote(id,index,newNote){
    console.log(id,newNote);
    try{
      if(newNote){
        const response=await axios.put(`/api/note/update/${id}`,newNote,
          {
            headers: {
                'Authorization': props.userData.token,
                'Content-Type': 'application/json',
            },
          }
        );
        setNotes(response.data);
        setEdit(false);
      }else{
        setEdit(notes[index]);
      }
    }catch(err){
      if(err.response.status == 401){
        logOut(props.setLoggedIn,props.setUserData);
        navigate("/login");
      }
    }
  }

  return (
    <div >
      
      <Header loggedIn={props.loggedIn} username={props.userData.username} setLoggedIn={props.setLoggedIn} setUserData={props.setUserData} />
      <CreateArea onAdd={addNote} isEdit={isEdit} setEdit={setEdit} onEdit={editNote} />
      <div className="overflow-auto px-8 pb-8">
        {notes.map((noteItem,index) => {
          if(isEdit==noteItem) return;
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              index={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onEdit={editNote}
              readOnly={true}
              theme="bubble"
            />
          );
        })}

      </div>
      <Footer />
    </div>
  );
}

export default Home;
