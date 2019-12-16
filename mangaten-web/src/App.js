import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/Header'
import ProfilePage from './pages/ProfilePage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'

class App extends React.Component {
  state = {
    logged: false,
    cart: []
  }

  componentDidMount() {
    if (localStorage.getItem('access-token')) {
      this.setState({ logged: true })
    }

    const cart = localStorage.getItem('cart')
    if (cart) {
      this.setState({ cart })
    }
  }

  addProductToCart = (product) => {
    const cart = this.state.cart

    // se já tiver o produto no carrinho, retorna a posição dele se não, retorna -1
    const productInCart = cart.find(item => item.product._id === product._id)
    const index = cart.indexOf(productInCart)
    if (index === -1) {
      const newItem = {
        product,
        total: 1
      }

      cart.push(newItem)
    } else {
      cart[index].total++
    }

    this.setState({ cart })
  }

  removeProductFromCart = (product) => {
    const cart = this.state.cart

    const productInCart = cart.find(item => item.product._id === product._id)

    if (!productInCart) return

    const index = cart.indexOf(productInCart)

    if (productInCart.total === 1) {
      cart.splice(index, 1);
    } else {
      cart[index].total--
    }

    this.setState({ cart })
  }

  render() {
    console.log('cart', this.state.cart)
    return (
      <BrowserRouter>
        <Header logged={this.state.logged} />

        <Switch>
          <Route path="/products/:id">
            <ProductPage addProductToCart={this.addProductToCart} />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/cart">
            <CartPage
              cart={this.state.cart}
              addProductToCart={this.addProductToCart}
              removeProductFromCart={this.removeProductFromCart}
            />
          </Route>
          <Route path="/">
            <div>Pagina inicial</div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
