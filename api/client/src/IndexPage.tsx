import { useEffect, useState } from "react";
import Section from "./Sections";

const apiURL = import.meta.env.VITE_REACT_APP_API_URL
const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //Depois de pegar o json de post fazemos com que ele seja o valor da state variable
    fetch(`${apiURL}/post`).then((response) => {
     
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  
  return (
    <>
      {/* For each post object, create a Section and pass the information */}
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Section {...post} key={index + 1} />
        ))}
    </>
  );
};

export default IndexPage;


