<template>
  <div class="product-list">
    <br>
    <button class="btn" @click.prevent="back">Back</button>
    <Loading v-if="isLoading"/>
    <div v-else class="row">
      <CardCart class="item hoverable" v-for="cart in carts" :key="cart.id" :cart="cart"/>
      <br>
    </div>
  </div>
</template>
<script>
import CardCart from '../components/CardCart.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'ProductList',
  props: {
    // msg: String
  },
  components: {
    CardCart,
    Loading
  },
  body () {
    return {
      product: ''
    }
  },
  computed: {
    carts: function () {
      return this.$store.state.carts
    },
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    back: function () {
      this.$router.push('/products')
    }
  },
  created () {
    this.$store.dispatch('getCart')
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
