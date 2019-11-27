// db
const { client, ObjectId } = require('../../db.js')

async function getOne(req, res) {
  const id = req.params.id //recebe o id

  const productCollection = client.db('mangaten').collection('product') //define a coleção

  try {
    const product = await productCollection.findOne({ _id: ObjectId(id) }) //procura produto com o id

    res.json({ product }) //retorna o product
  } catch (error) {
    res.status(404).end()
  }
}

async function getMany() {

}

async function createOne() {

}

async function removeOne() {

}

module.exports = {
  getOne
}