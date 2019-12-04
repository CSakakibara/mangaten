const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const uri = 'mongodb+srv://jun:!7NmaainhgsaitkeNna&@mangaten-aqf2h.gcp.mongodb.net/test?retryWrites=true&w=majority'

const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true } // requirimentos do mongodb
const client = new MongoClient(uri, clientOptions) // cria o banco

function connectToMongoDB () { // conecta no banco
  const promise = new Promise(function (resolve) {
    client.connect(function () {
      resolve()
    })
  })

  return promise
}

module.exports = {
  client,
  connectToMongoDB,
  ObjectId
}
