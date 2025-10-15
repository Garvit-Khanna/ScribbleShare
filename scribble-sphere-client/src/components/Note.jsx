import React from "react";
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import ContentEditable from "./ContentEditable";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';

function Note(props) {
  return (
    <div className={`bg-white rounded-lg shadow-md shadow-slate-400 p-2 m-4 ${!props.view?"w-60 float-left":"w-2/3 mx-auto"}`} >
      {!props.view && <div className="cursor-pointer float-right " >
      <Tooltip title="FullScreen" arrow>
      <Link to={`/View`} state={{title:props.title,content:props.content,id:props.id,index:props.index}} >
        <OpenInNewIcon /></Link>
      </Tooltip>
      </div>}
      <div className="text-lg mb-2 text-center">{
        (props.view && !props.readOnly)?
          (<input
              className=" border-none p-2 outline-none text-xl resize-none block w-full"
              name="title"
              onChange={props.handleTitleChange}
              value={props.title}
              placeholder="Title"
          />):props.title
          }</div>
      {/* <p className="text-lg mb-3 whitespace-pre-wrap break-words">{props.content}</p> */}
      <ContentEditable content={props.content} readOnly={props.readOnly} theme={props.theme} handleChange={props.handleChange} />
      {props.onEdit && 
      <Tooltip title={props.readOnly?"Edit":"save"} arrow>
      <button className="relative mr-3 text-yellow-600 border-none w-9 h-9 cursor-pointer outline-none hover:text-yellow-900" onClick={() => props.onEdit(props.id,props.index)}>{props.readOnly?<DrawIcon />:<SaveAltIcon />}</button>
      </Tooltip>}
      {!props.readOnly && 
        <Tooltip title="cancel" arrow>
        <button className="relative mr-3 text-yellow-600 border-none w-9 h-9 cursor-pointer outline-none hover:text-yellow-900" onClick={() => props.onCancel()}><CancelIcon /></button>
        </Tooltip>
      }
      {props.onDelete && 
      <Tooltip title="Delete" arrow>
      <button className="relative float-right mr-3 text-yellow-600 border-none w-9 h-9 cursor-pointer outline-none hover:text-yellow-900" onClick={() => props.onDelete(props.id)}><DeleteIcon /></button>
      </Tooltip>}
    </div>
  );
}

export default Note;
