const jwt = require('jsonwebtoken') // bibliota pra gerar tokens de autenticaçãode, usando criptografia
const { client } = require('./db.js') 

function generateToken(user) { // recebe um usuario, retorna um token de acesso
  let payload = { email: user.email } // dados que serão criptografados dentro do token para serem usados pelo servidor
  let secret = 'I am the Bone of my Sword Steel is my Body and Fire is my Blood' // senha pro servidor decriptografar o token 
  // options: como o token vai ser gerado
  let options = { expiresIn: '1d' } //define tempo de expiração do token
  let token = jwt.sign(payload, secret, options) //gera o token
  return token
}

async function signup(request, response) {
  const { email, password, name} = request.body 
  if (!email || !password || !name) {// se algum campo estiver vazio, retorna um erro pro front 
    return response.json({ message: "preencha todos os campos" })
  }
  const usersCollection = client.db('mangaten').collection('users')
  const user = {
    email: email,
    password: password,
    name: name 
  }
  await usersCollection.insertOne(user) //cria usuario no banco
  const token = generateToken(user)// gera token pro user
  response.json({ token }) //retorna o token
}

async function signin(request, response) {
  const { email, password } = request.body
  if (!email || !password) { //verifica se os campos foram preenchidos
    return response.json({ message: "preencha email e password" }) 
  }
  const usersCollection = client.db('mangaten').collection('users') 
  const user = await usersCollection.findOne({ email: email, password: password }) //procura usuario com email e senha informado
  if (user === null || user === undefined) {
    return response.json({ message: "email ou password invalido" }) //exibe mensagem se não achar correspondencia
  }
  const token = generateToken(user) //gera token
  response.json({ token }) //retorna token
}

module.exports = { //exporta as funçoes 
  signup, 
  signin 
}