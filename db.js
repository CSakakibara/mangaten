// BANCO DE DADOS
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://jun:!7NmaainhgsaitkeNna&@mangaten-aqf2h.gcp.mongodb.net/test?retryWrites=true&w=majority"


const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true } // Coisas que o mongodb precisa funcionar, não precisa se improtar com isso
const client = new MongoClient(uri, clientOptions)

// Função ASINCROCA que conecta com o banco de dados não relaciona MongoDB
function connectToMongoDB() {
  const promise = new Promise(function (resolve) {
    client.connect(function () {
      resolve()
    })
  })

  return promise
}

module.exports = {
  client,
  connectToMongoDB
}