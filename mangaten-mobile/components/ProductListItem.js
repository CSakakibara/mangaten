import React from 'react'
import { Image, Text, View, Button } from 'react-native';
import styled from 'styled-components/native'

const Container = styled.View`
  margin: 20px;
`

const URL = 'https://mangaten-api.herokuapp.com/images/'

function ProductListItem(props) {
  return (
    <Container>
      <Image
        source={{ uri: URL + props.product.image }}
        style={{ width: '100%', height: 200 }}
      />
      <Text>{props.product.title}</Text>
      <Text>Volume {props.product.volume}</Text>
      <Text>R$ {props.product.price}</Text>
      <Button title="Detalhes" onPress={() => props.goToProductScreen(props.product)}>Ver Detalhes</Button>
    </Container>
  )
}

export default ProductListItem