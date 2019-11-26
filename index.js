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

app.post('/products/mangas/', protect, async function (request, response) { //cadastro manga
  const user = request.user //pegar dados do usuario verificado no protect

  const manga = request.body //pega os dados na requisição
  manga.createdBy = user._id // associa no item a ser inserido no banco o id do usuario que esta fazendo o cadastro

  const mangaCollection = client.db('mangaten').collection('manga') //define a coleção do banco
  await mangaCollection.insertOne(manga) //insere os dados na coleção
  response.status(201).json({ message: 'Manga Cadastrado' })
})

app.get('/products/mangas', async function (request, response) {
  const mangaCollection = client.db('mangaten').collection('manga') //define a coleção
  const mangas = await mangaCollection.find({}).toArray() //traz todos os itens da coleção
  response.status(200).json({ product: mangas }) //retorna os itens
})

app.get('/products/mangas/:id', async function (request, response) {
  const id = request.params.id //recebe o id
  const mangaCollection = client.db('mangaten').collection('manga') //define a coleção
  const manga = await mangaCollection.findOne({ _id: ObjectId(id) }) //procura manga com o id
  response.status(200).json({ product: manga }) //retorna o item
})

app.delete('/products/mangas/:id', protect, async function (request, response) {
  const id = request.params.id// recebe o id
  const user = request.user// recebe os dados do usuario

  const mangaCollection = client.db('mangaten').collection('manga')//referencia a coleção de manga
  const deleteManga = await mangaCollection.findOneAndDelete({ // fazer alterações para verificar se o usuario é adm
    _id: ObjectId(id),
    createdBy: ObjectId(user._id)
  })
  console.log('deleteManga', deleteManga.value)

  const manga = deleteManga.value

  response.status(200).json(manga) //retorna mensagem
})

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