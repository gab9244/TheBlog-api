import { useState } from "react";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL

const RegisterPage = () => {
  //Usaremos as state variable para poder mudar os valores que enviaremos ao banco de dados facilmente
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // register é uma função assincrona que é executada assim que enviamos o form, caso os dados enviados sejam aceitos eles seram adicionados ao nosso banco de dados e uma mensagem aparecerá na tela, caso contrario uma mensagem de erro aparecerá

  const register = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    const response = await fetch(`${apiURL}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 200) {
      alert("You are registrated");
    } else {
      alert("Registration has fail");
    }
  };

  return (
    <form className="Login" onSubmit={register}>
      <input
        type="text"
        placeholder="UserName"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="PassWord "
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
