import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
  //Usaremos useParams para pegar o parâmetro id da URL
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";
  return (
    <div className="postPage">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">By @{postInfo.author.username}</div>
     {/* Aqui comparamos as informações do usuario com as do post, caso quem estiver logado também tenha criado o post um link para altera o post aparecerá */}
      {userInfo.username === postInfo.author.username &&(
        <div  className="editLink">
          <Link to={`/edit/${postInfo._id}`}>Edit post</Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
