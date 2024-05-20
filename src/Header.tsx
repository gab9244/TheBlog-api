import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';

const Header =  () => {
  //Aqui usaremos context do react para passar os dados do usuario para outros componentes, para isso funcionar usaremos state variables.
  //Caso consigamos pegar os dados do usuario eles seram armazenados em userInfo e quando deslogamos limparemos os dados fazendo com que o valor de userInfo seja null
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => { 
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        });
    });
  },[]);

  const Logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null)
  };
  //Definimos username que recebe como valor o nome do usuario, podemos ver que pegamos esse dado do userInfo, usamos ?, assim caso username ainda não tenham valor, o valor da variavel sera null 
  const username = userInfo?.username

  return (
    <header>
      <Link to={"/"} className="Logo">
        <h1>MyBlog</h1>
      </Link>
      <nav className="registration">
      {/* O conteudo dessa parte mudará caso o username tenha valor ou não, se o usuario já estiver logado então o link com para create será mostrado e um botão para deslogar , caso contrário dois links para logar e registrar seram mostrados */}
        {username && (
          <>
           <span>Hi, {username}</span>
            <Link to="/create">Create new post</Link>
            <a onClick={Logout} className="logout">Logout</a>
          </>
        )}
        {!username && (
          <>
         
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
