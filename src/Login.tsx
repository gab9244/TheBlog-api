import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)

  const { setUserInfo } = useContext(UserContext);

    // login é uma função assincrona que é executada assim que enviamos o form, caso os dados que colocamos nos inputs batam com algum objeto no banco de dados o usuario é enviado para a pagina principal e agora ele esta logado, caso contrario uma mensagem de erro aparecerá na tela. Aqui usamos contexto para definir o valor da state variable setUserInfo para ser as informações do usuario

  const login = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
   const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      //É necessário adicionar credentials a solicitação para que possamos trabalhar com senhas
      credentials: 'include',
    });
    if(response.ok){
      response.json().then(userInfo =>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
      setRedirect(true)
    }
    else {
      alert('Wrong credentials')
    }
  };
  //Caso o valor de redirect seja true, o usuario é enviado para o root
  if(redirect){
    //Usamos Navigate para ir para uma página especifica, nesse caso é o root e por colocamo-lo no return isso acontecerá imediatamente
    return <Navigate to ={'/'} />
  }

  return (
    <form className="Login" onSubmit={login}>
      <input
        type="text"
        placeholder="UserName"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="PassWord"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
