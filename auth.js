const jwt = require('jsonwebtoken') // JWT bibliota pra gerar tokens de autenticaçãode, usando criptografia
const { client } = require('./db.js') 

function generateToken(user) { // recebe um usuario, retorna um token de acesso
  let payload = { email: user.email } // dados que serão criptografados dentro do token para serem usados pelo servidor
  let secret = 'I am the Bone of my Sword Steel is my Body and Fire is my Blood' // senha pro servidor decriptografar o token 
  // options: como o token vai ser gerado, como por exemplo quando ele vai deixar de ser valido
  let options = { expiresIn: '1d' }
  let token = jwt.sign(payload, secret, options) //gera o token
  return token
}

async function signup(request, response) {
  const { email, password, name} = request.body 
  if (!email || !password || !name) {// se algum campo estiver vazio, retorna um erro pro front 
    return response.json({ message: "preencha todos os campos" })
  }
  const usersCollection = client.db('mangaten').collection('users')
  const user = request.body 
  await usersCollection.insertOne(user) //cria usuario no banco
  const token = generateToken(user)// gera token pro user
  response.json({ token }) //retorna o token
}

async function signin(request, response) {
  const { email, password } = request.body
  if (!email || !password) { 
    return response.json({ message: "preencha email e password" }) 
  }
  const usersCollection = client.db('mangaten').collection('users')
  const user = await usersCollection.findOne({ email: email, password: password })
  if (user === null || user === undefined) {
    return response.json({ message: "email ou password invalido" })
  }
  const token = generateToken(user)
  response.json({ token })
}

module.exports = { //exporta as funçoes 
  signup, 
  signin 
}