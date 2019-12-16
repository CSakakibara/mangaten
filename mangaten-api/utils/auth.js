// vendors
const jwt = require('jsonwebtoken') // bibliota pra gerar tokens de autenticaçãode, usando criptografia
const bcrypt = require('bcrypt') // criptografia pras senhas

// Model
const User = require('../resources/user/user.model')

const secret = 'I am the Bone of my Sword Steel is my Body and Fire is my Blood' // senha pro servidor decriptografar o token

// JWT
function generateToken (user) { // recebe um usuario, retorna um token de acesso
  const payload = { // dados que serão criptografados dentro do token para serem usados pelo servidor
    _id: user._id
  }
  // options: como o token vai ser gerado
  const options = { expiresIn: '1d' } // define tempo de expiração do token
  const token = jwt.sign(payload, secret, options) // gera o token
  return token
}

function verifyToken (token) {
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

// user
function encryptPassword (password) {
  return bcrypt.hash(password, 10)
}

function verifyUserPassword (user, rawPassword) {
  if (!user) {
    return false
  }

  const encryptedPassword = user.password
  return bcrypt.compare(rawPassword, encryptedPassword)
}

async function signUp (req, res) {
  const { email, password, name, username } = req.body
  if (!email || !password || !name || !username) { // se algum campo estiver vazio, retorna um erro pro front
    return res.json({ message: 'preencha todos os campos' })
  }

  const queryEmail = { username }
  const queryUsername = { email }
  const registeredEmail = await User.findOne({ $or: [queryEmail, queryUsername] })
  if (registeredEmail) {
    return res.json({ message: 'email ou username ocupado por outra conta' })
  }

  const passwordHash = await encryptPassword(password)

  const user = {
    email,
    password: passwordHash,
    name,
    username
  }

  try {
    const userCreated = await User.create(user) // cria usuario no banco e recebe o objeto recem criado no banco já com o id

    const token = generateToken(userCreated) // gera token pro user
    res.json({ token }) // retorna o token
  } catch (error) {
    res.status(403).json({ error }) // retorna o error
  }
}

async function signIn (req, res) {
  const { email, password } = req.body
  if (!email || !password) { // verifica se os campos foram preenchidos
    return res.json({ message: 'Preencha email e password' })
  }

  const user = await User.findOne({ email }) // procura usuario com email e senha informado
  const isCorrectPassword = await verifyUserPassword(user, password) // verifica se a senha que o usuario inseriu dá o match com a senha do usuario do banco

  if (!user || !isCorrectPassword) {
    return res.json({ message: 'Email ou password incorreto' }) // exibe mensagem se não achar correspondencia
  }

  const token = generateToken(user) // gera token
  res.json({ token }) // retorna token
}

async function protect (req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).end()
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return res.status(401).end()
  }

  const projections = {
    email: 1,
    name: 1,
    username: 1,
    isAdmin: 1
  }
  const user = await User.findOne({ _id: payload._id }, projections)

  console.log('user', user)
  if (!user) {
    return res.status(401).end()
  }

  req.user = user

  next()
}

// admin
async function signUpAdmin (req, res) {
  const { email, password, name, username } = req.body
  if (!email || !password || !name || !username) { // se algum campo estiver vazio, retorna um erro pro front
    return res.json({ message: 'Preencha todos os campos' })
  }

  const queryEmail = { username }
  const queryUsername = { email }
  const registeredEmail = await User.findOne({ $or: [queryEmail, queryUsername] })
  if (registeredEmail) {
    return res.json({ message: 'Email ou username ocupado por outra conta' })
  }

  const passwordHash = await encryptPassword(password)

  const user = {
    email,
    password: passwordHash,
    name,
    username,
    isAdmin: true
  }

  try {
    await User.create(user) // cria usuario no banco e recebe o objeto recem criado no banco já com o id

    res.status(201).end() // retorna o token
  } catch (error) {
    res.status(403).json({ error }) // retorna o error
  }
}

async function protectAdmin (req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(401).end()
  }

  next()
}

// exporta as funçoes
module.exports = {
  signUp,
  signIn,
  encryptPassword,
  protect,
  protectAdmin,
  signUpAdmin
}
