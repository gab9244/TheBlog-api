import { useEffect, useState } from "react";
import Section from "./Sections";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //Depois de pegar o json de post fazemos com que ele seja o valor da state variable
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
    {/* Para cada objeto json uma seção sera criada e também enviamos as informações para a seção*/}
    {posts.length > 0 && posts.map(post => (
      <Section {...post}/>
    ))}
    </>
  );
};

export default IndexPage;
