// vendors
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
    },
    image: {
      type: String,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      trim: true
    }
  }
)

productSchema.index({ title: 'text' })
//define a collection product, e utiliza o schema criado
const Product = mongoose.model('product', productSchema)

module.exports = Product
