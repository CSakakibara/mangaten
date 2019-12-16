const makeCrudController = require('../../utils/crud')

// utils
const { sendEmail } = require('../../utils/email')

// models
const Product = require('./product.model')
const User = require('../user/user.model')

// controller
const controller = makeCrudController(Product)


controller.getMany = async (req, res) => {
  try {
    const title = req.query.title
    const genre = req.query.genre
    const query = {}

    if (title) {
      query.$text = {
        $search: title
      }
    }

    if (genre) {
      query.genre = genre
    }

    const items = await Product.find(query).exec() // traz todos os itens da coleção

    res.json({ items }) // retorna os itens
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
}

controller.createOne = async (req, res) => {
  const item = req.body // pega os dados na requisição

  if (req.file && req.file.filename) {
    item.image = req.file.filename
  }

  try {
    const product = await Product.create(item)
    res.status(201).json({ data: product })

    sendEmailToAllUsers(`Novo Produto na loja`, `Chegou agora o volume ${product.volume} de ${product.title} na loja do mangaten, corram porque temos apenas ${product.stock}`)
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

async function sendEmailToAllUsers(title, body) {
  const users = await User.find({}).lean().exec()

  const userEmails = users.map(user => user.email)

  sendEmail(userEmails, title, body)
}

module.exports = controller
