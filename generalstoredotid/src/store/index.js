import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import M from 'materialize-css'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    heroku: 'https://generalstore-server-90210.herokuapp.com',
    products: [],
    carts: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: `${this.state.heroku}/product`
      })
        .then(response => {
          commit('SET_PRODUCTS', response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    login ({ commit, dispatch }, loginData) {
      axios({
        method: 'POST',
        url: `${this.state.heroku}/login`,
        data: {
          email: loginData.email,
          password: loginData.password
        }
      })
        .then(response => {
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('token', response.data.token)
          router.push('/products')
        })
        .catch(err => {
          M.toast({ html: err.response.data })
        })
    },
    register ({ commit, dispatch }, registerData) {
      axios({
        method: 'POST',
        url: `${this.state.heroku}/register`,
        data: {
          email: registerData.email,
          password: registerData.password,
          role: 'buyer'
        }
      })
        .then(response => {
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('token', response.data.token)
          router.push('/products')
        })
        .catch(err => {
          M.toast({ html: err.response.data })
        })
    },
    addCart ({ commit, dispatch }, productData) {
      axios({
        method: 'POST',
        url: `${this.state.heroku}/cart`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: productData.ProductId,
          amount: productData.amount
        }
      })
        .then(response => {
          M.toast({ html: 'Added item to the cart' })
        })
        .catch(err => {
          console.log(err.response.data)
          M.toast({ html: err.response.data })
        })
    },
    getCart ({ commit, dispatch }) {
      axios({
        method: 'GET',
        url: `${this.state.heroku}/cart`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          commit('SET_CART', response.data)
        })
        .catch(err => {
          M.toast({ html: err.response.data })
        })
    }
  },
  modules: {
  }
})
