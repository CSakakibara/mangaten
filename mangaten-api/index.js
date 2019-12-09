// vendors
const express = require('express') // usado pra criar servidor http

const PORT = 3000 // porta a ser usada posteriormente com express
const app = express() // cria uma aplicação express

// db
const { connectToMongoDB } = require('./utils/db') // banco de dados

// auth
const { signUp, signIn, protect, protectAdmin, signUpAdmin } = require('./utils/auth') // criar conta, logar, verificar logado

// routes
const productsRouter = require('./resources/product/product.router')
const usersRouter = require('./resources/user/user.router')

// middlewares
app.use(express.json()) // traz os dados do corpo da requição pro req.body

app.post('/signup', signUp)
app.post('/signin', signIn)
app.use('/products', productsRouter)
app.use('/users', protect, usersRouter)
app.post('/admin/signup', protect, protectAdmin, signUpAdmin)

async function main () { // inicia o servidor
  await connectToMongoDB()

  await app.listen(PORT)
  console.log(`Servidor em localhost: ${PORT}`)
}

main()
