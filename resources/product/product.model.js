const mongoose = require('mongoose') // ODM - Object Document Model/Modeling

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    price: {
      type: Number,
      required: true,
      trim: true
    },
    volume: {
      type: Number,
      required: true,
      trim: true
    },
    author: {
      type: String,
      trim: true
    }
  }
)

const Model = mongoose.model('product', productSchema)

module.exports = Model
