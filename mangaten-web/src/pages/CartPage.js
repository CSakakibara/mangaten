import React from 'react'
import axios from '../utils/axios'

import '../css/cart.css'

function isValidCep(cep = '') {
  if (!cep) return false

  cep = cep.trim()

  // Caso o CEP não esteja nesse formato ele é inválido!
  const regex = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;

  if (cep.length > 0 && regex.test(cep)) {
    return true
  }

  return false
}

function CartPage(props) {
  const [shippingPrice, setShippingPrice] = React.useState()
  const [cep, setCep] = React.useState(null)

  function buy() {
    axios.post('/batata',{
      cart:props.cart
    })
  }

  function calculate() {
    axios.get(`shipping/${cep}`)
      .then((payload) => {
        setShippingPrice({ sedexPrice: payload.data.sedexPrice, pacPrice: payload.data.pacPrice })
      })
  }

  const isCartEmpty = props.cart.length === 0

  if (isCartEmpty) {
    return (
      <div>
        <img className="emptycart"
          src='/images/empty-cart.png'
          alt="Carrinho Vazio"
        />
      </div>
    )
  }

  let total = null
  if (!isCartEmpty) {
    const allProductsPrices = props.cart.map(item => item.product.price * item.total)
    total = allProductsPrices.reduce((acc, price) => acc + price, 0)
  }

  return (
    <div className="cart">
      {props.cart.map(item =>
        <div className="cart-item" key={item.product._id}>
          <div className="cart-item--title">
            {item.product.title}
          </div>

          <div className="cart-item--total-amount">
            <div className="cart-item--amount">
              <span className="selector-button" onClick={() => props.removeProductFromCart(item.product)}>-</span>
              {item.total}
              <span className="selector-button" onClick={() => props.addProductToCart(item.product)}>+</span>
            </div>

            <div className="cart-item--total">
              R$ {(item.product.price * item.total).toFixed(2)}
              <br></br><br></br>
            </div>
          </div>
        </div>
      )}
      <div className="cart-total">
        Total: R$ {total.toFixed(2)}
      </div>

      {!isCartEmpty &&
        <div className="cart-item--cep">
          <label><b>CEP</b></label>
          <input
            placeholder="Insira seu cep. Ex: 38406400"
            value={cep}
            type="text"
            onChange={(event) => setCep(event.target.value)}
          />

          <button
            onClick={calculate}
            disabled={!isValidCep(cep)}
          >
            Calcular
          </button>
          {shippingPrice &&
            <div>
              <div>
                Preço pac: {shippingPrice.sedexPrice}
              </div>
              <div>
                Preço sedex: {shippingPrice.pacPrice}
              </div>
            </div>
          }
        </div>
      }

      {total &&
        <>
          <button onClick={buy}>Finalizar Compra</button>
        </>
      }
    </div>
  )
}

export default CartPage