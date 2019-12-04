const { client, ObjectId } = require('../../db.js')

async function getOne (req, res) {
  const id = req.params.id // recebe o id

  const usersCollection = client.db('mangaten').collection('users') // define a coleção

  try {
    const user = await usersCollection.findOne({ _id: ObjectId(id) }) // procura user com o id

    res.json({ user }) // retorna o user
  } catch (error) {
    res.status(404).end()
  }
}

async function getMany (req, res) {
  const usersCollection = client.db('mangaten').collection('users') // define a coleção
  try {
    const users = await usersCollection.find({}).toArray() // traz todos os itens da coleção

    res.json({ users: users }) // retorna os itens
  } catch (error) {
    res.status(404).end()
  }
}

async function removeOne (req, res) {
  const id = req.params.id// recebe o id
  // const user = req.user// recebe os dados do usuario

  const usersCollection = client.db('mangaten').collection('user')// referencia a coleção

  try {
    const deletedUser = await usersCollection.findOneAndDelete({ // fazer alterações para verificar se o usuario é adm
      _id: ObjectId(id)
      // createdBy: ObjectId(user._id)
    })
    console.log('deletedUser', deletedUser.value)

    const user = deletedUser.value

    res.status(200).json(user) // retorna mensagem
  } catch (error) {
    res.status(404).end()
  }
}

module.exports = {
  getOne,
  getMany,
  removeOne
}
