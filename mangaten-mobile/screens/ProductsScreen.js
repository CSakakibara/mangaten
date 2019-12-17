import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from '../utils/axios'

import ProductListItem from '../components/ProductListItem'

import styled from 'styled-components/native'

const Container = styled.View`
  background-color: papayawhip;
  justify-content: center;
`

export default function ProductsScreen(props) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const params = {}

    axios.get('/products')
      .then(payload => {
        setProducts(payload.data.items)
      })
  }, [])

  function addProductToCart(product) {
    props.navigation.navigate('Cart', { product })
  }

  function goToProductScreen(product) {
    props.navigation.navigate('Product', { product, addProductToCart })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {products.map(product =>
          <ProductListItem
            key={product._id}
            goToProductScreen={goToProductScreen}
            product={product}
          />
        )}
      </ScrollView>
    </View>
  );
}

ProductsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
