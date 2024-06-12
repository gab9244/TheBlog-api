import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  //Usaremos useParams para pegar o parâmetro id da URL
  const { id } = useParams();

  // useEffect(() => {
  //   fetch(`${apiURL}/post/${id}`).then((response) => {
  //     response.json().then((postInfo) => {
  //       setPostInfo(postInfo);
  //     });
  //   });
  // }, []);
  useEffect(() => {
    fetch(`${apiURL}/post/${id}`, {
      credentials: 'include', // This ensures cookies are sent
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((postInfo) => {
      setPostInfo(postInfo);
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }, []);
  //Assim que apertamos o botão para deletar enviamos uma solicitação de delete para o endereço ${apiURL}/post/${id}
  const DeletePost = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    //Caso o usuario aperte em confirmar no prompt que aparecerá ele deletará o post and será mandado para a tela inicial
    //Erá para ser o contrário, mas por algum motivo depois que deletamos o post o usuario não é mandado para a página inicial
    if (confirmed == true) {
      navigate("/");
      try {
        const response = await fetch(`${apiURL}/post/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (response.ok) {
          alert("Post deleted successfully");
          navigate("/");
        } else {
          const data = await response.json();
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Caso as informações necessário não estejam nos input, apenas retornaremos nada

  if (!postInfo) return "";

  return (
    <div className="postPage">
      <h1>{postInfo.title}</h1>
      {/* Infelizmente é necessário fazer todo esse processo se quisemos mostrar a hora em que o post foi criado */}
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">By @{postInfo.author.username}</div>
      {/* Aqui comparamos as informações do usuario com as do post, caso quem estiver logado também tenha criado o post um link para altera o post aparecerá */}
      {userInfo.username === postInfo.author.username && (
        <div className="decisionButtons">
          <div className="editLink">
            {/*Se o usúario clicar no botão ele será enviado para a página de edição */}
            <Link to={`/edit/${postInfo._id}`}>Edit post</Link>
          </div>
          <button className="deleteButton" onClick={DeletePost}>
            Delete this post
          </button>
        </div>
      )}
      <div className="image">
        <img src={`${apiURL}/api/${postInfo.cover}`} alt="" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
