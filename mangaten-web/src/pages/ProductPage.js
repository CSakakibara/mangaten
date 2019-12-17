import React from 'react'

import { withRouter } from "react-router-dom";

import '../css/products.css'

import axios from '../utils/axios'


import Loading from '../components/Loading'

const URL = 'https://mangaten-api.herokuapp.com/images/'

class ProductsPage extends React.Component {
  state = {
    product: []
  }

  componentDidMount() {
    const id = this.props.match.params.id

    this.setState({ isLoading: true })
    axios.get(`products/${id}`)
      .then(payload => {
        this.setState({ product: payload.data.item, isLoading: false })
      })

  }

  addToCart = () => {
    this.props.addProductToCart(this.state.product)
    this.props.history.push('/cart')
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }

    const product = this.state.product

    return (
      <div className="product">
        <div>
          <img
            className="product--image"
            src={URL + product.image}
            alt={`Imagem do mangá ${product.title}`}
          />
          <button id = "addCart"
            onClick={this.addToCart}
          >
            Adicionar ao carrinho
          </button>
        </div>
        <div className="product--title">{product.title}</div>
        <div className="product--volume">Volume: {product.volume} <br></br>
          Escrito por: {product.author} <br></br>
          Quantidade estoque: {product.stock}
        </div>
        <div className="product--price"> R$ {product.price}</div>
        <div className="product--description">{product.description}</div>

      </div>
    )
  }
}

export default withRouter(ProductsPage)