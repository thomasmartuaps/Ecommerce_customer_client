<template>
  <div>
    <div class="col s2">
      <div class="card">
        <div class="card-image">
          <img height="250px" width="250px" :src="cart.Product.image_url">
        </div>
        <div class="card-content">
          <p><b>{{ cart.Product.name }}</b></p>
          <p>Price: ${{ cart.Product.price }} x {{ cart.amount }}</p>
          <p>Total: ${{ total }}</p>
          <br>
        </div>
        <div class="card-action">
          <a href="#" v-on:click.prevent="addToCart">Change Amount</a>
          <input v-if="loggedIn" type="number" id="amount" min="0" v-model="amount" class="validate">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'Card',
  props: {
    cart: Object
  },
  data () {
    return {
      amount: this.cart.amount
    }
  },
  methods: {
    addToCart: function () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('addCart', { ProductId: this.product.id, amount: this.amount })
        M.toast({ html: 'You shoould be able to add cart' })
      } else {
        M.toast({ html: 'Log in to be able to make purchases' })
      }
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    },
    total () {
      return this.cart.Product.price * this.cart.amount
    }
  }
}
</script>

<style>

</style>
