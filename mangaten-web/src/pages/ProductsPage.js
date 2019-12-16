import React from 'react'

import '../css/products.css'

import axios from '../utils/axios'

import ProductListItem from '../components/ProductListItem'
import Loading from '../components/Loading'

class ProductsPage extends React.Component {
  state = {
    products: [],
    textFilter: '',
    genreFilter: ''
  }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = () => {
    const path = 'products'

    const params = {}

    if (this.state.textFilter) {
      params.title = this.state.textFilter
    }
    if (this.state.genreFilter) {
      params.genre = this.state.genreFilter
    }

    this.setState({ isLoading: true })
    axios.get('products', { params })
      .then(payload => {
        const products = payload.data.items
        this.setState({ products, isLoading: false })
      })
  }

  onFieldChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    const newState = {}
    newState[name] = value

    this.setState(newState)
  }

  render() {
    return (
      <div className="products">
        <div className="products-search">
          <input
            type="text"
            name="textFilter"
            placeholder="Pesquisar por titulo do mangá"
            value={this.state.textFilter}
            onChange={this.onFieldChange}
          />
          <select name="genreFilter" onChange={this.onFieldChange} defaultValue="">
            <option value="">Generos</option>
            <option value="action">Ação</option>
            <option value="adventure">Aventura</option>
            <option value="comedy">Comedia</option>
            <option value="drama">Drama</option>
            <option value="slice-of-life">Slice of Life</option>
          </select>
          <button onClick={this.fetchProducts}>Buscar</button>
        </div>

        {this.state.isLoading &&
          <Loading />
        }
        {!this.state.isLoading &&
          <div className="products-list">
            {this.state.products.map(product =>
              <ProductListItem
                key={product._id}
                product={product}
                addProductToCart={this.addProductToCart}
              />
            )}
          </div>
        }
      </div>
    )
  }
}

export default ProductsPage