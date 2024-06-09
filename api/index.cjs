const express = require('express')
//Usamos bcrypt para criptografar as senhas do usuarios.É necessário baixar o bcrypt com npm install bcrypt
const bcrypt = require('bcrypt')
//Cors é usado para simplificar o envio de dados por varias fontes. É necessário usa-lo pois os browsers geralmente dificultam o compatilamento e envio de dados e é por isso que o usamos no express.use()
const  cors = require('cors')
const User = require('./models/User.cjs')
const Post = require('./models/Post.cjs')

const app = express()
const jwt = require('jsonwebtoken')
// const path = require('path')
//É necessário baixar o cookie-parser
const cookieParser = require('cookie-parser')
//Baixe o package multer para que possamos enviar os documentos para o middleware uploads
const multer = require('multer')
// dest e o destino dos arquivos, nesse caso enviaremos eles para uploads
const uploadMiddleware = multer({dest: '/api/uploads'})
//Para mudar o final do nome do arquivo enviado usaremos fs

const fs = require('fs')
//Usamos salt para criptografar a senha
const salt = bcrypt.genSaltSync(10)
const secret = 'fvdfg3434fgdff4dfher4teg'
//Quando lidamos com credenciais/senhas e tokens é necessário colocar mais informações como definir o valor de credentials para true e fornecer a origem das solicitações http://localhost:5173

const allowedOrigins = [
    'https://theblog-4agb.onrender.com',
    'https://theblog-api.onrender.com',
    'http://localhost:4000',
    'http://localhost:5173'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
//Usamos essa sintaxe para poder mostrar as imagens
app.use('/api/uploads', express.static('/api/uploads'));
require('dotenv').config()
//Usando mongoose.connect junto da chave podemos nos conectar ao banco de dados do atlas
const connectDB = require('./db/connect.cjs')
// app.use(express.static(path.join(process.cwd(), '/dist')))

//Essa solicitação post funciona da seguinte maneira. Primeiro pegamos do corpo da solicitação o username e a password, depois usamos try e catch e caso esse dados passem pelas especificações que fizemos no User.cjs enviamos um status de 200 e os dados ao banco de dados, caso contrario apenas retornamos status 400 e um json com o erro
app.post('/register', async (req,res) =>{
    const {username , password} = req.body

    try {
        //Quando usamos User.create nos enviamos dados ao banco de dados, assim criano um novo registro
        const userDoc =  await User.create({
            username, 
            //Ao inves de mandamos ao banco de dados o nome do usuario e a senha, agora a senha é enviada criptografada
            password: bcrypt.hashSync(password, salt)
        })
        res.status(200).json(userDoc)
    }catch(err){
        res.status(400).json(err)
    }
})


//É necessário baixar jsonwebtoken
//Para logar vamos usar uma solicitação post. Primeiro pegamos o username e password dos inputs, depois criamos a variavel userDoc que pega do banco de dados o objeto que possuir um username igual ao do input, em seguida criamos a variavel pass que compara a senha do input com a senha do objeto que pegamos(userDoc), se a senha for igual o valor de pass é true, caso contrário é false. Se o valor de pass for true 
app.post('/login', async (req,res) =>{
    const {username , password} = req.body
    const userDoc = await User.findOne({username})
    const pass = bcrypt.compareSync(password,userDoc.password)

    if(pass) {
        //logged in
        //sign é uma função do jwt(jsonwebtoken) que recebe quatro parâmetros o primeiro {username,id:userDoc. id} é o username é o id do objeto userDoc e eles seram codificados no token, o segundo parâmetros é secret que é a chave secreta usada para assinar o token, o terceiro parâmetros tipicamente é usado para especificar opções para assinar o token, mas nesse caso apenas deixaremos vazio, por fim vem o terceiro parâmetros que é uma call back function que recebe dois parâmetros, caso um erro aconteça uma mensagem de erro é jogada, caso contrário, um token é gerado e um cookie é retornado com o nome de "token" tendo como valor o token gerado e também retornamos um json 'ok'
        jwt.sign({username,id:userDoc._id}, secret, {}, (error,token) =>{
            if(error) throw error
            res.cookie('token', token).json({
                id:userDoc._id,
                username,   
            })
        })
    }else {
        res.status(400).json('Error, try again')
    }
    
  
})

// Primeiro pegamos o cookie chamado de token, depois usamos jwt para verificar se o token bate com o secret que usamos para criptrografa-lo se não bater retornamos um erro, caso contrário retornamos o json as informações como username e id, entenpedente do token bater ou não, também retornaremos um jsom com os cookies
app.get('/profile', (req,res) =>{
    const {token} = req.cookies
    jwt.verify(token, secret, {}, (error,info)=>{
        if(error) throw error
        res.json(info)
    })
  
})
    //Quando o usuario sair da sua conta o cookie chamado de token e limpo e um json dizendo ok é enviado
app.get('/logout', (req,res) =>{
    res.cookie('token','').json('ok')
})

//Quando fizemos uma solicitação post para post também mudaremos o final do nome do arquivo enviado para que assim possamos colocar o  nome do tipo de arquivo que for colocado em uploads, json , png e etc
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    //Primeiro usamos desestruturação de objeto para pegar to req as propriedades originalname e path 
    //originalname é o nome do arquivo no computador de quem esta fazendo upload do arquivo
    //path é o caminho para o arquivo ulpado
    const {originalname,path} = req.file;
    //parts é uma array que é constituida pelo nome original do arquivo sem esta criptrografado e o tipo do arquivo, fazemos isso usando o split que além de transformar o nome original em uma array ele o separar entre o nome e o tipo do arquivo no ponto final 
    const parts = originalname.split('.');
    //ext é o ultimo elemento da array parts, sendo esse  o tipo do arquivo
    const ext = parts[parts.length - 1];
    //newPath é o caminho para o arquivo mais o seu tipo
    const newPath = path+'.'+ext;
    //Por fim renomeamos o arquivo para que ele também tenha o seu tipo incluido
    fs.renameSync(path, newPath);
  
    //Nessa parte do código nos conectamos com o banco de dados
    //Primeiro pegamos o token
    const {token} = req.cookies;
    //Depois usamos jwt para verificar e enviar os dados para o banco de dados caso eles passem pela verificação 
    jwt.verify(token, secret, {}, async (error,info) => {
      if (error) throw error;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    
    });
  
  });


  app.put('/post', uploadMiddleware.single('file'), async (req,res) =>{
    let newPath = null
    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies
    jwt.verify(token, secret, {}, async (error,info) => {
        if (error) throw error;
        const {id,title,summary,content} = req.body;

        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

        if(!isAuthor) {
            res.status(400).json('You are not the author of this post')
        }

        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })

        res.json(postDoc);
      
      });
 })


  //Quando fizemos um solicitação get ao post o objeto author apenas possuirá o username como propriedade, fazemos isso para que apenas informações necessárias sejam enviadas
app.get('/post', async (req,res)=>{
   res.json(
    await Post.find()
    .populate('author',['username'])
    //Usando sort podemos organizer os postes para que os que forem adicionados por último fiquem em cime e por isso que usamos essa sintaxe 
    .sort({createdAt: -1})
    //Limitamos a quantidade de postes que serem mostrados para 20
    .limit(20)
)


})

//Assim que a solicitação para deletar é enviada deletamos o post pelo id que esta na url
    app.delete('/post/:id', async (req,res) =>{
        try {
             const post = await Post.findByIdAndDelete(req.params.id)
             if (!post) {
                return res.status(404).json({ message: 'Post not found' });
              }
    
        }catch(error){
            res.status(404).json(error)
        }
    
        
     })


app.get('/post/:id', async(req,res) =>{
  const {id} = req.params
  const postDoc =  await (await Post.findById(id)).populate('author', ['username'])
  res.json(postDoc)
})

// app.get('*', (req,res) => res.sendFile(path.join(process.cwd(), '/dist/index.html'))) 

const port = process.env.PORT || 4000;
const start = async () =>{
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port, ()=>{
           console.log(`The Server is On ${port}`)
         
       })
    } catch (error) {
       console.log(error)
       
    }
   }
   
   start()

