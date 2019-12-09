// vendors
const mongoose = require('mongoose') // ODM - Object Document Model/Modeling
const ObjectId = mongoose.Types.ObjectId

const uri = 'mongodb+srv://jun:!7NmaainhgsaitkeNna&@mangaten-aqf2h.gcp.mongodb.net/test?retryWrites=true&w=majority'

function connectToMongoDB () { // conecta no banco
  const mongoDbOptions = { useNewUrlParser: true, useUnifiedTopology: true } // requirimentos do mongodb
  return mongoose.connect(uri, mongoDbOptions)
}

module.exports = {
  connectToMongoDB,
  ObjectId
}
