const mongoose = require('mongoose')

//Aqui definimos o formado dos dados que receberemos, caso eles não batam com essas especificações eles não seram aceitos
const UserSchema = new mongoose.Schema({
    username : {type: String, required:true, min: 4, unique: true},
    password : {type: String, required:true},
})


const UserModel = mongoose.model('User', UserSchema)

module.exports =  UserModel;