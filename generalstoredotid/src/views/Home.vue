<template>
  <div class="home">
    <div class="navbar-fixed">
      <nav class="green darken-3">
        <div class="nav-wrapper green darken-3">
          <a href="#" @click.prevent="goProduct" class="brand-logo right site-name"><i class="material-icons large">shopping_basket</i> GeneralStore.com</a>
          <ul v-if="!loggedIn" id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="" @click.prevent="loginPage">Login</a></li>
          </ul>
          <ul v-else id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="" class="site-name" @click.prevent="goProduct">Welcome back, {{ user }}!</a></li>
            <li><a href="" @click.prevent="goCheckout">Shopping Cart</a></li>
            <li><a href="" @click.prevent="goHistory">Purchase History</a></li>
            <li><a href="" @click.prevent="logout">Logout</a></li>
          </ul>
        </div>
      </nav>
    </div>
  <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    loginPage: function () {
      this.$router.push('/login')
    },
    logout: function () {
      localStorage.clear()
      this.$store.state.loggedIn = false
    },
    goCheckout: function () {
      this.$router.push('/checkout')
    },
    goProduct: function () {
      this.$router.push('/products')
    },
    goHistory: function () {
      this.$router.push('/history')
    }
  },
  computed: {
    loggedIn: function () {
      return this.$store.state.loggedIn
    },
    user: function () {
      return localStorage.getItem('email')
    }
  },
  created () {
    this.$router.push('/products')
    if (localStorage.getItem('token')) {
      this.$store.state.loggedIn = true
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Pacifico&display=swap');
.site-name{
  font-family: 'Pacifico', cursive;
}
</style>
