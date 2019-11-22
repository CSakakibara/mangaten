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
  await usersCollection.insertOne({ email, password})

  const user = createUser(email, password)
  // TODO: criar usuario de verdade com um banco de dados

  // cria um novo token pro usuario qeu acabou de ser criado
  const token = generateToken(user)

  response.json({ token })
}

/*
 * função de sign in que pega os dados do usuario e loga no sistema e depois de logada, um token de acesso
*/
async function signin(request, response) {
  const { email, password } = request.body

  if (!email || !password) {
    // se não tiver email ou senha, retorna um erro pro front
    return response.json({ message: "Need email and password" })
  }

  const usersCollection = client.db('mangaten').collection('users')

  const user = await usersCollection.findOne({ email: email, password: password })

  if (user === null || user === undefined) {
    // se não achar nenhum usuario signica que a senha é invalida ou o usuario não existe
    return response.json({ message: "Email or password invalid" })
  }

  // cria um novo token pro usario que acabou de fazer signin
  const token = generateToken(user)

  response.json({ token })
}

module.exports = {
  signup, // exporta signup
  signin // export signin
}