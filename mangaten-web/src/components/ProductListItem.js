import React from 'react'
import { Link } from 'react-router-dom'

const URL = 'http://localhost:5000/images/'

function Product(props) {
  return (
    <div className="product-list-item">
      <Link to={`/products/${props.product._id}`}>
        <img
          className="product-list-item--image"
          src={URL + props.product.image}
          alt={`Capa do mangá ${props.product.title}`}
        />
        <div className="product-list-item--title">{props.product.title}</div>
        <div className="product-list-item--volume">Volume {props.product.volume}</div>
        <div className="product-list-item--price">R$ {props.product.price}</div>
        <button className="product-list-item--button">Ver Detalhes</button>
      </Link>
    </div>
  )
}

export default Product