<template>
  <div class="product-list">
    <h4 class="left-side"><b>All Products</b></h4>
    <Loading v-if="isLoading"/>
    <div v-else class="row">
      <Card class="item hoverable" v-for="product in products" :key="product.id" :product="product"/>
      <br>
    </div>
  </div>
</template>
<script>
import Card from '../components/Card.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'ProductList',
  props: {
    // msg: String
  },
  components: {
    Card,
    Loading
  },
  body () {
    return {
      product: ''
    }
  },
  computed: {
    products: function () {
      return this.$store.state.products
    },
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
  .items {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  }
  .item {
    margin: 2vw;
  }
  .left-side {
    text-align: left;
    margin: 2vw;
    padding: 1vw;
  }
</style>
