<template>
  <div class="product-list">
    <br>
    <h5>Click the button at bottom left to pay. Or click website logo to return. </h5>
    <button class="btn-large fixed" @click.prevent="checkout"><i class="material-icons left large">local_offer</i> <b>Pay!</b></button>
    <Loading v-if="isLoading"/>
    <div v-else-if="carts.length > 0" class="row">
      <CardCart class="item hoverable" v-for="cart in carts" :key="cart.id" :cart="cart"/>
      <br>
    </div>
    <div v-else>
      <h4>No items on your cart now</h4>
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
    },
    checkout: function () {
      this.$store.dispatch('checkout')
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
  .fixed {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
