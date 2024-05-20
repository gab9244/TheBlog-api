const mongoose = require('mongoose')
const {Schema, model} = mongoose   

//Temos que criar um modelo para que possamos enviar os dados do post para o banco de dados, nesse caso enviaremos o titulo, resumo, conteudo e o cover
const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type:Schema.Types.ObjectId, ref:'User'},
    
}, {
    //timestamps é um atalho para dois outros campos, createdAt e updatedAt
    //createAt Este campo registra a data e hora de quando o documento foi salvo pela primeira vez no banco de dados. É definido uma vez durante a criação e permanece inalterado depois
    //updatedAt Este campo registra a data e hora da última atualização do documento. O Mongoose atualizará automaticamente este campo sempre que você modificar e salvar o documento

    timestamps:true, 
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel