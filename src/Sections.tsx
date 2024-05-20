import { parseISO, formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
//Instale data-fns com ele podemos mostrar a quando um post foi criado de uma maneira mais legivel
//Aqui criamos cada seção e usando desestruturação de objeto estraimos as informações da api post.Primeiro pegamos titulo,resumo,
const Section = ({_id, title, summary, cover, createdAt, author }) => {
  return (
    <section className="ToPage">
      {/* Colocaremos tanto a imagem do post quanto o titulo dentro de Links que quando clicados nos levaram para a pagína que possui o conteúdo do post */}
      <Link to={`/post/${_id}`}>
        <img
          //Usando essa url podemos mostrar as imagens de cada post
          src={"http://localhost:4000/" + cover}
          alt="coding"
        
        />
      </Link>

      <div className="context">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <div className="info">
          <a className="author">{author.username}</a>
          {/* Usamos essa sintaxe para pegar o tempo em que o post foi criado, createdAt tem como valor a data e hore em que o documento foi salvo pela primeira vez */}
          <time>{formatISO9075(parseISO(createdAt))}</time>
        </div>
        <p>{summary}</p>
      </div>
    </section>
  );
};

export default Section;
