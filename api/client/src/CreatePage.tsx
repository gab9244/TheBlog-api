import { useState } from "react";
// import 'froala-editor/js/froala_editor.pkgd.min.js';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import FroalaEditorComponent from 'react-froala-wysiwyg'; 

import { Editor } from "@tinymce/tinymce-react";
import { Navigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

// CreatePost envia uma solicitação fetch onde
const CreatePost = () => {
  // Usaremos as state variables para guardar o titulo e o resumo do post
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const createNewPost = async (ev) => {
    //FormData é usado para construir um conjundo de chaves e valores que representam campos de formularios e seus valores, basicamente um objeto que facilita o envio de dados de formularios via solicitação HTTP
    //No nosso caso usamos o FormData para enviar os dados do formulario para a api post, como pode vewr criamos a variavel data e para cada campo criamos uma chave e como valor damos as state variables com o valor dos campos

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();

    //Mandamos uma solicitação post para post onde enviamos os dados do formúlario caso a responta seja ok mudamos o valor da state variable redirect para true e então enviamos o usúario para o root usando Navigate
    const response = await fetch(`${apiURL}/post`, {
      method: "POST",
      body: data,
      credentials: "include", 
    });
    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    // Quando enviamos o formularío a função createNewPost sera executada
    <form className="CreatePost" onSubmit={createNewPost}>
      {/* Aqui o usuário coloca o seu titulo */}
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      {/* Aqui o usuário coloca o seu resumo*/}
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      {/* O usuário usarar o input do tipo file para pegar a imagem sobre o conteúdo do post que ele escreverá */}
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      {/* Quill é um editor popular open source então ele acaba sendo uma das melhores opções */}
      {/* <FroalaEditorComponent
        model={content}
        onModelChange={(newValue) => setContent(newValue)}
      /> */}
       <Editor
        apiKey="id8j23ghu2p0ywt03er7vo2q3md82l625n16u5ce7a20ecjh"
        value={content}
        //É necessário substituir onChange por onEditorChange por causa da api que estamos usando
        onEditorChange={(newValue) => setContent(newValue)}
        init={{
       
          
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (_request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
      />
      <button>Create a new Post</button>
    </form>
  );
};

export default CreatePost;
