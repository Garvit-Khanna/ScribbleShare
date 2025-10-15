import React from "react";

function TextArea(props){
    return (
        <textarea
            className={`${props.tag!='a'?"w-full":"w-1/2"} border-none outline-none text-xl resize-none h-auto`}
            name={`content${props.index}`}
            onClick={()=> props.setIsExpanded(true)}
            onChange={(e)=> props.handleChange(e,props.index)}
            value={props.value}
            placeholder={(props.tag=='a')?"Add link":"Take a note..."}
            
        />
    );
}

export default TextArea;