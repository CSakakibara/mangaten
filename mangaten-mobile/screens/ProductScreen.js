import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';


const URL = 'https://mangaten-api.herokuapp.com/images/'

function ProductScreen(props) {
  const product = props.navigation.state.params.product
  const addProductToCart = props.navigation.state.params.addProductToCart

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: URL + product.image }}
        style={{ width: '100%', height: 200 }}
      />
      <Text>{product.title}</Text>
      <Text>Volume {product.volume}</Text>
      <Text>R$ {product.price}</Text>
      <Button title="Adicionar ao Carrinho" onPress={() => addProductToCart(product)} />
    </View>
  );
}

ProductScreen.navigationOptions = {
  title: 'Manga',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    margin: 20,
    backgroundColor: '#fff',
  },
});

export default ProductScreen