const express = require('express') // usado pra criar servidor http
const { connectToMongoDB } = require('./utils/db') // banco de dados
// const { signUp, signIn } = require('./auth.js') // criar conta, logar, verificar logado

// routes
const productsRouter = require('./resources/product/product.router')
const usersRouter = require('./resources/user/user.router')

const PORT = 3000 // porta a ser usada posteriormente com express
const app = express() // cria uma aplicação express

app.use(express.json()) // traz os dados do corpo da requição pro req.body

/*
3 - User o Model do user ao invez da collection para fazer as oprações de criar e pegar usuario do banco no arquivo utils/auth
4 - Criar controller do usuario pra atualizar informações da conta, como nome
5 - Criar a rota GET /users/me pegar as informações do usuario atual(no caso o do token, pegando o id do usuario que tá no payload do token)
6 - Criar a rota PUT /users/me para utilizando do controller updateMe atualizar as informações do usuario
(recomendo ir fazer de pouquinho a pouquinho para não crashar o serverido, recomendo começar pela criação e rotas e controllers do /users sem se preocupar sign)
*/

// app.post('/signup', signUp)
// app.post('/signin', signIn)
app.use('/products', productsRouter)
app.use('/users', usersRouter)

async function main () { // inicia o servidor
  await connectToMongoDB()

  app.listen(PORT, () => {
    console.log('Servidor em localhost:' + PORT)
  })
}

main()
