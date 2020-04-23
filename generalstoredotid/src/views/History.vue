<template>
  <div class="product-list">
    <br>
    <h4>Your Purchase History</h4>
    <Loading v-if="isLoading"/>
    <div v-else-if="carts.length > 0" class="row">
      <CardCart class="item hoverable" v-for="cart in carts" :key="cart.id" :cart="cart"/>
      <br>
    </div>
    <div v-else>
      <h4>You never bought anything from our store</h4>
    </div>
  </div>
</template>
<script>
import CardCart from '../components/CardCart.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'History',
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
      return this.$store.state.checked
    },
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  methods: {
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
