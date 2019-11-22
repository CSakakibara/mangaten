//começo importações
const express = require('express') //usado pra criar servidor http
const bodyParser = require('body-parser') 

const { client, connectToMongoDB } = require('./db.js') 
const { signup, signin } = require('./auth.js')   
//fim importações

const PORT = 3000 // porta a ser usada posteriormente com express
const app = express() // cria uma aplicação express

app.use(bodyParser.json()) //leva os dados do corpo da requição pro request.body
app.post('/signup', signup)
app.post('/signin', signin)

// cadastrar manga
app.post('/products/mangas/', async function (request, response) {
  const manga = request.body
  const mangaCollection = client.db('mangaten').collection('manga')
  await mangaCollection.insertOne(manga)
  response.json({ message: 'Manga Cadastrado'})
})

// listar mangas
app.get('/products/mangas', async function (request, response) {
  const mangaCollection = client.db('mangaten').collection('manga')
  const mangas = await mangaCollection.find({}).toArray()
  response.json({ product: mangas })
})

// buscar manga por titulo
app.get('/products/mangas/:name', async function (request, response) {
  const name = request.params.name
  const mangaCollection = client.db('mangaten').collection('manga')
  const manga = await mangaCollection.findOne({ title: name })
  response.json({ product: manga })
})

// excluir manga por titulo
app.delete('/products/mangas/:name', async function (request, response) {
  const name = request.params.name
  const mangaCollection = client.db('mangaten').collection('manga')
  await mangaCollection.findOneAndDelete({ title: name })
  response.json({ message: 'Manga Deletado' })
})

// listar users
app.get('/users', async function (request, response) {
  const usersCollection = client.db('mangaten').collection('users')
  const users = await usersCollection.find({}).toArray()
  response.json({ product: users })
})

async function main() {
  await connectToMongoDB()

  app.listen(PORT, function () {
    console.log('Servidor em localhost:' + PORT)
  })
}

main()