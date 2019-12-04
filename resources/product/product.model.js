const mongoose = require('mongoose') // ODM - Object Document Model/Modeling

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
      // unique: true // Usar no user no campo email e username
    },
    description: String,
    price: Number
  }
)

const Model = mongoose.model('product', productSchema)

module.exports = Model
