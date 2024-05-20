import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
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

   const response = await fetch('http://localhost:4000/post', {
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
      {/* Para termos mais contro-le na hora de escrever usaremos um editor popular chamado de tinymce  */}
      <Editor
        apiKey="id8j23ghu2p0ywt03er7vo2q3md82l625n16u5ce7a20ecjh"
        value={content}
        //É necessário substituir onChange por onEditorChange por causa da api que estamos usando
        onEditorChange={(newValue) => setContent(newValue)}
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo |formatselect | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
      <button>Update Post</button>
    </form>
  );
};

export default EditPost;
