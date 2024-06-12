import LayOut from "./LayOut.js";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login.js";
import RegisterPage from "./Register.js";
import { UserContextProvider } from "./UserContext.js";
import CreatePost from "./CreatePage.js";
import IndexPage from "./IndexPage.js";
import PostPage from "./PostPage.js";
import EditPost from "./EditPost.js";

const App = () => {
  return (
    //É necessário colocar todos os componentes que queremos que acessem as state variables com os dados do usuario dentro do UserContextProvider
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/register" index element={<RegisterPage />} />
          <Route path="/create" index element = {<CreatePost/>}/>
          <Route path="/post/:id" element = {<PostPage />} />
          <Route path="/edit/:id" element = {<EditPost />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
