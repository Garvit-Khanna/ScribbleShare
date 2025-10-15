import React, { useState,useEffect } from "react";
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Contenteditable from "./ContentEditable";

function CreateArea(props) {
    const [isExpanded,setIsExpanded]=useState(false);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");

    useEffect(()=>{
        if(props.isEdit){
            console.log(props.isEdit);
            setTitle(props.isEdit.title);
            setContent(props.isEdit.content);
            setIsExpanded(true);
        }
    },[props.isEdit]);

    function handleTitleChange(e){
        const value=e.target.value;
        setTitle(value);
    }

    async function submitNote(e) {
        const newNote={
            title: title,
            content: content
        };
        if(props.isEdit){
            await props.onEdit(props.isEdit._id,-1,newNote);
        }else{
            await props.onAdd(newNote);
        }
        setTitle("");
        setContent("");
        e.preventDefault();
    }

    function handleExpand(){
        setIsExpanded(false);
    }

    return (
        <div className="">
        <form className="create-note relative w-1/2 mx-auto mt-8 mb-5 bg-white p-4 rounded-xl shadow-md shadow-slate-500 ">
            {isExpanded && <ExpandLessIcon className="float-right rounded-full hover:bg-yellow-500 cursor-pointer" onClick={handleExpand} />}
            
            {isExpanded && (<input
                className=" border-none p-2 outline-none text-xl resize-none block w-5/6"
                name="title"
                onChange={handleTitleChange}
                value={title}
                placeholder="Title"
            />)}
           
            <div onClick={()=> setIsExpanded(true)} className="p-2">

                <Contenteditable content={content} handleChange={setContent} readOnly={false} theme="snow" />
            </div>
            
            <Zoom in={isExpanded}><Fab  size="medium" color="primary"   className="bg-yellow-500 absolute right-5 -bottom-4 hover:bg-yellow-600" onClick={submitNote}><AddIcon /></Fab></Zoom>
        </form>
        </div>
    );
}

export default CreateArea;
