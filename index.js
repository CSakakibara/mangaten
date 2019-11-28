//começo importações
const express = require('express') //usado pra criar servidor http

const { client, connectToMongoDB, ObjectId } = require('./db.js')
const { signUp, signIn, protect } = require('./auth.js')

//  routes
const productsRouter = require('./resources/product/products.router')
const usersRouter = require('./resources/user/users.router')

//fim importações

const PORT = 3000 // porta a ser usada posteriormente com express
const app = express() // cria uma aplicação express

app.use(express.json()) // traz os dados do corpo da requição pro req.body

app.post('/signup', signUp)
app.post('/signin', signIn)
app.use('/products', productsRouter)
app.get('/users', usersRouter)

async function main() { //inicia o servidor
  await connectToMongoDB()

  app.listen(PORT, function () {
    console.log('Servidor em localhost:' + PORT)
  })
}

main()