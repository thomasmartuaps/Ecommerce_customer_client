<template>
  <div class="home">
    <div class="navbar-fixed">
      <nav class="navbar-custom-color">
        <div class="nav-wrapper navbar-custom-color">
          <a href="#" @click.prevent="goProduct" class="brand-logo right site-name"><i class="material-icons large">shopping_basket</i> GeneralStore.com</a>
          <ul v-if="!loggedIn" id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="" @click.prevent="loginPage"><b>Login</b></a></li>
          </ul>
          <ul v-else id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="" class="site-name" @click.prevent="goProduct">Welcome back, {{ user }}!</a></li>
            <li><a href="" @click.prevent="goProduct">Product List</a></li>
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
      this.$router.push('/products')
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
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto&display=swap');
.site-name{
  font-family: 'Libre Franklin', sans-serif;
  font-weight: bold;
  margin-right: 1vw;
}
body {
  background-color: #FFFBE6;
}
.navbar-custom-color {
  background-color: #356859;
  color: #B9E4C9;
}
</style>
