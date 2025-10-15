import React,{useCallback,useRef,useState} from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css';
import CircularProgress from '@mui/material/CircularProgress';

function ContentEditable(props){
  const reactQuillRef = useRef(null);
  const [hideLoader,setLoader]=useState(true);

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_PRESET
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    const url = data.url;
    return url
  }
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        setLoader(false);
        const url = await uploadToCloudinary(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
        setLoader(true);
      }
    };
  }, []);
  const  modules  = {
    toolbar:{container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };
  
  return (
    <div className="relative">
      <div className={`h-full z-10 absolute w-full bg-gray-400 opacity-50 flex  justify-center items-center ${hideLoader && "hidden"}`}>
        <CircularProgress color="inherit" className="h-full w-full" />
      </div>
      <div >
        <ReactQuill
          ref={reactQuillRef}
          theme={props.theme}
          readOnly={props.readOnly}
          modules={modules}
          placeholder="write your content ...."
          onChange={props.handleChange}
          value={props.content}
        >
        </ReactQuill>
      </div>
    </div>
  );

}

export default ContentEditable;