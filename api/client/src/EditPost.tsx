import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${apiURL}/post/`+id)
    .then(response => {
          response.json().then(postInfo =>{
            setTitle(postInfo.title)
            setContent(postInfo.content)
            setSummary(postInfo.summary)


          })
      }
    )
  },[]);

  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData()
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set('id', id)
    if( files?.[0]) {
      data.set("file", files?.[0]);
    }

   const response = await fetch(`${apiURL}/post`, {
      method : 'PUT',
      body: data,
      credentials: 'include',
    })

    if(response.ok){
      setRedirect(true)
    }
   
    
  };

  if (redirect) {
    return <Navigate to={'/post/'+id} />;
  }
  const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }, { 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image', 'video'
  ];

  return (
    // Quando enviamos o formularío a função createNewPost sera executada
    <form className="CreatePost" onSubmit={updatePost}>
      {/* Aqui o usuário coloca o seu titulo */}
      <input
        type="text"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => {    console.log('Input value changed:', ev.target.value);
        setTitle(ev.target.value);
        console.log('Title state updated:', title);
      }}
      />
      {/* Aqui o usuário coloca o seu resumo*/}
      <input
        type="text"
        placeholder={"Summary"}
        onChange={(ev) => setSummary(ev.target.value)}
        value={summary}
       
      />
      {/* O usuário usarar o input do tipo file para pegar a imagem sobre o conteúdo do post que ele escreverá */}
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      {/* Quill é um editor popular open source então ele acaba sendo uma das melhores opções */}
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button>Update Post</button>
    </form>
  );
};

export default EditPost;
