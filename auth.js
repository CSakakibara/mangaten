const jwt = require('jsonwebtoken') // JWT bibliota pra gerar tokens de autenticaçãode, usando criptografia


// BANCO
const { client } = require('./db.js')

/*
 * função que recebe um usuario e retorna um novo token de acesso para aquele usuario
*/
function generateToken(user) {
  // dados que serãõ encodificados dentro do token para serem usados depois mais tarde pelo servidor
  let payload = { email: user.email }
  // senha super secreta pro servidor descriptografar o token e verificar se ele é valido e pegar as informações do payload
  let secret = 'Batata é muito bom'
  // options para configurar como o token irá ser gerado, como por exemplo quando ele irá experir deixar de ser valido
  let options = { expiresIn: '1d' }

  // jwt.sign metodo do jwt que gera um token dado os seguites parametros: payload, secret e options
  let token = jwt.sign(payload, secret, options)

  // returna o token pra quem chamou a função generateToken
  return token
}


/*
 * função que executa o signup pega os dados do body da requisão e cria um novo usuario com os dados
*/
function signup(request, response) {
  const { email, password } = request.body

  if (!email || !password) {
    // se não tiver email ou senha, retorna um erro pro front
    return response.json({ message: "Need email and password" })
  }

  const usersCollection = client.db('mangaten').collection('users')
  // usersCollection.insertOne({ email: ?, password: ? })

  const user = createUser(emai, password)
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