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
        <div v-if="!status" class="card-action">
          <a href="#" v-on:click.prevent="changeAmt">Change Amount</a>
          <input type="number" id="amount" v-model="amount" class="validate">
          <button class="btn" @click.prevent="remove">Remove</button>
        </div>
        <div v-else class="card-action">
          <a href="#" v-on:click.prevent>This purchase has been checked out</a>
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
    changeAmt: function () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('changeAmt', { id: this.cart.id, amount: this.amount })
      } else {
        M.toast({ html: 'Log in to be able to make purchases' })
      }
    },
    remove: function () {
      this.$store.dispatch('remove', { id: this.cart.id })
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    },
    status () {
      return this.cart.status
    },
    total () {
      return this.cart.Product.price * this.cart.amount
    }
  }
}
</script>

<style>
.card-action {
}
</style>
