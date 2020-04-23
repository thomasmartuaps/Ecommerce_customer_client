<template>
  <div class="login-register">
    <div class="form-group" v-if="!registration" id="login-form">
      <form id="login-form">
        <h4 style="color: black;"> Login: </h4>
        <div class="input-field col s3">
          <input id="email-login" type="text" v-model="email" class="validate" placeholder="E-mail">
          <!-- <label for="email-login">E-mail</label> -->
        </div>
        <!-- <div class="input-field col s3">
          <input type="text"   class="validate"><br>
          <label >Email</label>
        </div> -->
        <div class="input-field col s3">
          <input type="password" id="password-login" v-model="password" class="validate" placeholder="Password"><br><br>
          <!-- <label for="password-login">Password</label> -->
        </div>
        <button v-on:click.prevent="login" class="btn">Login
          <i class="material-icons right">subdirectory_arrow_right</i>
        </button>
      <div>
        <p>Don't have an account? Register <a class="link" href="" v-on:click.prevent="toRegister">Here.</a></p>
      </div>
      </form>
    </div>
    <div class="form-group" v-else id="register-form">
      <form id="register">
        <h4 style="color: black;"> Register: </h4>
        <div class="input-field col s3">
          <input type="text" id="email-register" v-model="email" class="validate" placeholder="E-mail"><br>
          <!-- <label for="email-register">Email</label> -->
        </div>
        <div class="input-field col s3">
          <input type="password" id="password-register" v-model="password" class="validate" placeholder="Password"><br><br>
          <!-- <label for="password-register">Password</label> -->
        </div>
        <button v-on:click.prevent="register" class="btn">Register
          <i class="material-icons right">subdirectory_arrow_right</i>
        </button>
      <div>
        <p>Or login <a class="link" href="" v-on:click.prevent="toLogin">Here.</a></p>
      </div>
      </form>
    </div>
    <button v-on:click.prevent="browse" class="btn">Just browse!
      <i class="material-icons right">subdirectory_arrow_right</i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      registration: false
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
    },
    register: function () {
      this.$store.dispatch('register', { email: this.email, password: this.password })
    },
    toRegister: function () {
      this.registration = true
      this.email = ''
      this.password = ''
    },
    toLogin: function () {
      this.registration = false
      this.email = ''
      this.password = ''
    },
    browse: function () {
      this.$router.push('/products')
    }
  },
  computed: {
    loggedIn: function () {
      return this.$store.state.loggedIn
    },
    user: function () {
      return localStorage.getItem('email')
    }
  }
}
</script>

<style>
.link {
  color: #3c82f7!important;
}
.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-register {
  margin-top: 15vh;
  /* display: flex; */
  color: rgb(107, 107, 107)!important;
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
}
</style>
