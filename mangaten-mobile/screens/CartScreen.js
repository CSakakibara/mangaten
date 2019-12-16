import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, Button, StyleSheet, TextInput } from 'react-native';

import axios from '../utils/axios'

import styled from 'styled-components/native'

const Item = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

function CartScreen(props) {
  const [cart, setCart] = useState([])
  const [shippingPrice, setShippingPrice] = React.useState()
  const [cep, setCep] = React.useState(null)

  function addToCart(product) {
    const newCart = [...cart]
    // se já tiver o produto no carrinho, retorna a posição dele se não, retorna -1
    const productInCart = cart.find(item => item.product._id === product._id)
    const index = cart.indexOf(productInCart)
    if (index === -1) {
      const newItem = {
        product,
        total: 1
      }

      newCart.push(newItem)
    } else {
      newCart[index].total++
    }

    setCart(newCart)
  }

  function removeFromCart(product) {
    const newCart = [...cart]

    const productInCart = cart.find(item => item.product._id === product._id)

    if (!productInCart) return

    const index = cart.indexOf(productInCart)

    if (productInCart.total === 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index].total--
    }

    setCart(newCart)
  }

  useEffect(() => {
    if (props.navigation.state.params && props.navigation.state.params.product) {
      addToCart(props.navigation.state.params.product)
    }
  }, [props.navigation.state.params && props.navigation.state.params.product])


  const isCartEmpty = cart.length === 0

  if (isCartEmpty) {
    return <Text>Carrinhos Vazio</Text>
  }

  function buy() {

  }

  function calculate() {
    axios.get(`shipping/${cep}`)
      .then((payload) => {
        setShippingPrice({ sedexPrice: payload.data.sedexPrice, pacPrice: payload.data.pacPrice })
      })
  }

  let total = null
  if (!isCartEmpty) {
    const allProductsPrices = cart.map(item => item.product.price * item.total)
    total = allProductsPrices.reduce((acc, price) => acc + price, 0)
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Text>{JSON.stringify(cart, null, 2)}</Text> */}
      {cart.map(item =>
        <Item key={item.product._id}>
          <Text>
            {item.product.title}
          </Text>

          <Buttons>
            <Button title="-" onPress={() => removeFromCart(item.product)} />
            <Text>{item.total}</Text>
            <Button title="+" onPress={() => addToCart(item.product)} />
          </Buttons>

          <Text>
            R$ {(item.product.price * item.total).toFixed(2)}
          </Text>
        </Item>
      )}
      <Text>
        total: R$ {total.toFixed(2)}
      </Text>
      {!isCartEmpty &&
        <View>
          <Text>CEP</Text>
          <TextInput
            placeholder="ex: 38406400"
            value={cep}
            onChangeText={(text ) => setCep(text )}
          />

          <Button
            title="Calcular frete"
            onPress={calculate}
            disabled={!isValidCep(cep)}
          />
          {shippingPrice &&
            <Text>
              <Text>
                preço pac: {shippingPrice.sedexPrice}
              </Text>
              <Text>
                preço sedex: {shippingPrice.pacPrice}
              </Text>
            </Text>
          }
        </View>
      }

      {total &&
        <>
          <Button onPress={buy} title="Finalizar Compra" />
        </>
      }
    </ScrollView>
  );
}

CartScreen.navigationOptions = {
  title: 'Cart',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
  },
});

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


export default CartScreen