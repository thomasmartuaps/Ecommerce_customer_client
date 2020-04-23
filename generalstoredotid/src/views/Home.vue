<template>
  <div class="home">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <a href="#" @click.prevent class="brand-logo right"><i class="material-icons large">shopping_basket</i> GeneralStore.com</a>
          <ul v-if="!loggedIn" id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="" @click.prevent="loginPage">Login</a></li>
          </ul>
          <ul v-else id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href="" @click.prevent>Welcome back, {{ user }}!</a></li>
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
