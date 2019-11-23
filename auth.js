const jwt = require('jsonwebtoken') // bibliota pra gerar tokens de autenticaçãode, usando criptografia
const bcrypt = require('bcrypt')

const secret = 'I am the Bone of my Sword Steel is my Body and Fire is my Blood' // senha pro servidor decriptografar o token 

const { client, ObjectId } = require('./db.js')


function generateToken(user) { // recebe um usuario, retorna um token de acesso
  const payload = { // dados que serão criptografados dentro do token para serem usados pelo servidor
    _id: user._id
  }
  // options: como o token vai ser gerado
  const options = { expiresIn: '1d' } //define tempo de expiração do token
  const token = jwt.sign(payload, secret, options) //gera o token
  return token
}

function verifyToken(token) {
  const promise = new Promise((resolve) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        return resolve(null)
      }

      resolve(payload)
    })
  })

  return promise
}

function encryptPassword(password) {
  return bcrypt.hash(password, 10)
}

function verifyUserPassword(user, rawPassword) {
  if (!user) {
    return false
  }

  const encryptedPassword = user.password
  return bcrypt.compare(rawPassword, encryptedPassword);
}



async function signUp(request, response) {
  const { email, password, name } = request.body
  if (!email || !password || !name) { // se algum campo estiver vazio, retorna um erro pro front
    return response.json({ message: "preencha todos os campos" })
  }

  const usersCollection = client.db('mangaten').collection('users')

  const registeredEmail = await usersCollection.findOne({ email })
  if (registeredEmail) {
    return response.json({ message: "email ocupado por outra conta" })
  }k

  const passwordHash = await encryptPassword(password)

  const user = {
    email,
    password: passwordHash,
    name
  }

  const newUserDoc = await usersCollection.insertOne(user) //cria usuario no banco
  const newUser = newUserDoc.ops[0] // recebe o objeto recem criado no banco já com o id
  delete newUser.password // remove password do objecto do usuario

  const token = generateToken(newUser)// gera token pro user
  response.json({ token }) //retorna o token
}

// TODO: criar rota que usa esse controler signUpAdmin onde somente um administrar pode acessar e criar conta para outros admininistradores
async function signUpAdmin () {

}

async function signIn(request, response) {
  const { email, password } = request.body
  if (!email || !password) { //verifica se os campos foram preenchidos
    return response.json({ message: "preencha email e password" })
  }

  const usersCollection = client.db('mangaten').collection('users')

  const user = await usersCollection.findOne({ email }) //procura usuario com email e senha informado
  const isCorrectPassword = await verifyUserPassword(user, password) // verifica se a senha que o usuario inseriu dá o match com a senha do usuario do banco

  if (!user || !isCorrectPassword) {
    return response.json({ message: "email ou password incorreto" }) //exibe mensagem se não achar correspondencia
  }

  const token = generateToken(user) //gera token
  response.json({ token }) //retorna token
}

async function protect(request, response, next) {
  const token = request.headers.authorization

  if (!token) {
    return response.status(401).end()
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return response.status(401).end()
  }

  const usersCollection = client.db('mangaten').collection('users')

  const user = await usersCollection.findOne({ _id: ObjectId(payload._id) }, { email: true, name: true, password: false })

  if (!user) {
    return response.status(401).end()
  }

  user.delete

  request.user = user

  next()
}

// TODO: criar o middlewProctedAdin onde executa a mesam forma que o protect e valida se o usuario logado é um admin
// TODO: usar esse middleware para proteger as rotas de criar novos admins, e criar/delete/modificar produtos
async function protectAdmin (request, response, next) {

}

module.exports = { //exporta as funçoes
  signUp,
  signIn,
  protect
}

