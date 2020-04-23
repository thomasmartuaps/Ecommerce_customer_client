<template>
  <div>
    <div class="col s2">
      <div class="card">
        <div class="card-image">
          <img height="250px" width="250px" :src="product.image_url">s
        </div>
        <div class="card-content">
          <p><b>{{ product.name }}</b></p>
          <p>Price: ${{ product.price }} Stock: {{ product.stock }}</p>
          <br>
          <a class="waves-effect waves-light btn-small">{{ product.category }}
            <i v-if="product.category === 'Toys'" class="material-icons right">motorcycle</i>
            <i v-if="product.category === 'Techs'" class="material-icons right">computer</i>
            <i v-if="product.category === 'General'" class="material-icons right">local_mall</i></a>
        </div>
        <div class="card-action">
          <a href="#" v-on:click.prevent="addToCart">Add To Cart</a>
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
    product: Object
  },
  methods: {
    addToCart: function () {
      if (localStorage.getItem('token')) {
        M.toast({ html: 'You shoould be able to add cart' })
      } else {
        M.toast({ html: 'Log in to be able to make purchases' })
      }
    }
  }
}
</script>

<style>

</style>
