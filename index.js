//começo importações
const express = require('express') //usado pra criar servidor http

const { client, connectToMongoDB, ObjectId } = require('./db.js')
const { signUp, signIn, protect } = require('./auth.js')
//fim importações

// routes
const productRouter = require('./resources/product/product.router')

const PORT = 3000 // porta a ser usada posteriormente com express
const app = express() // cria uma aplicação express

app.use(express.json()) // middleware leva os dados do corpo da requição pro req.body

app.post('/signup', signUp)
app.post('/signin', signIn)
app.use('/products', productRouter)

// listar users
app.get('/users', async function (request, response) {
  const usersCollection = client.db('mangaten').collection('users') //definir coleção de usuarios
  const users = await usersCollection.find({}).toArray()//recebe todos os itens da coleção
  response.json({ product: users })//retorna todos os itens recebidos
})

async function main() {
  await connectToMongoDB()

  app.listen(PORT, function () {
    console.log('Servidor em localhost:' + PORT)
  })
}

main()