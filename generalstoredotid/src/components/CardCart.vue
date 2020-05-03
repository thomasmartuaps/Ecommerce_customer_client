<template>
  <div>
    <div class="col s2">
      <div class="card">
        <div class="card-image">
          <img height="250px" width="250px" :src="placeholder">
          <button v-if="!status" class="btn del-button" @click.prevent="remove"><i class="small material-icons">delete</i></button>
        </div>
        <div class="card-content">
          <p class="product-title"><b>{{ cart.Product.name }}</b></p>
          <p class="desc">Price: ${{ cart.Product.price }} x {{ cart.amount }}</p>
          <p class="desc">Total: ${{ total }}</p>
          <br>
          <a class="waves-effect waves-light btn-small cat-button">{{ cart.Product.category }}
            <i v-if="cart.Product.category === 'Toys'" class="material-icons right">motorcycle</i>
            <i v-if="cart.Product.category === 'Techs'" class="material-icons right">computer</i>
            <i v-if="cart.Product.category === 'General'" class="material-icons right">local_mall</i></a>
        </div>
        <div v-if="!status" class="card-action">
          <a href="#" v-on:click.prevent="changeAmt">Change Amount</a>
          <input type="number" id="amount" v-model="amount" class="validate">
        </div>
        <div v-else class="card-action">
          <p class="italic">Item purchased on {{purchaseDate}}.</p>
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
    purchaseDate () {
      const d = new Date(this.cart.updatedAt)
      return d.toDateString()
    },
    total () {
      return this.cart.Product.price * this.cart.amount
    },
    placeholder () {
      return `https://api.adorable.io/avatars/285/${this.cart.Product.name}.png`
    }
  }
}
</script>

<style>
  .product-title {
    color: #FD5523;
  }
  .card {
    /* background-color: #B9E4C9; */
    padding: 5px;
  }
  .desc {
    color: #6e6e6e;
  }
  .del-button {
    background-color: #37966F!important;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .del-button:hover {
    background-color: rgb(104, 201, 139)!important;
  }
  .cat-button {
    background-color: #37966F!important;
  }
  .italic {
    font-style: italic;
  }
</style>
