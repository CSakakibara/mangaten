//começo importações
const express = require('express') //usado pra criar servidor http
const bodyParser = require('body-parser')

const { client, connectToMongoDB, ObjectId } = require('./db.js')
const { signUp, signIn, protect } = require('./auth.js')
//fim importações

const PORT = 3000 // porta a ser usada posteriormente com express
const app = express() // cria uma aplicação express

app.use(bodyParser.json()) //leva os dados do corpo da requição pro request.body

app.post('/signup', signUp)
app.post('/signin', signIn)

// cadastrar manga
app.post('/products/mangas/', protect, async function (request, response) {
  const user = request.user

  const manga = request.body
  manga.createdBy = user._id

  const mangaCollection = client.db('mangaten').collection('manga')
  await mangaCollection.insertOne(manga)
  response.status(201).json({ message: 'Manga Cadastrado' })
})

// listar mangas
app.get('/products/mangas', async function (request, response) {
  const mangaCollection = client.db('mangaten').collection('manga')
  const mangas = await mangaCollection.find({}).toArray()
  response.status(200).json({ product: mangas })
})

// buscar manga por titulo
app.get('/products/mangas/:id', async function (request, response) {
  const id = request.params.id
  const mangaCollection = client.db('mangaten').collection('manga')
  const manga = await mangaCollection.findOne({ _id: ObjectId(id) })
  response.status(200).json({ product: manga })
})

// excluir manga por titulo
app.delete('/products/mangas/:id', protect, async function (request, response) {
  const id = request.params.id
  const user = request.user

  const mangaCollection = client.db('mangaten').collection('manga')
  const deleteManga = await mangaCollection.findOneAndDelete({
    _id: ObjectId(id),
    createdBy: ObjectId(user._id)
  })
  console.log('deleteManga', deleteManga.value)

  const manga = deleteManga.value

  response.status(200).json(manga)
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