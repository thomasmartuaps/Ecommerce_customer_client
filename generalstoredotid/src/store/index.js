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
    carts: [],
    checked: [],
    isLoading: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      const carts = []
      const checked = []
      payload.forEach(el => {
        if (el.status) {
          checked.push(el)
        } else {
          carts.push(el)
        }
      })
      state.carts = carts
      state.checked = checked
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      commit('SET_LOADING', true)
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
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    login ({ commit, dispatch }, loginData) {
      commit('SET_LOADING', true)
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
          M.toast({ html: err.response.data.message })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
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
          M.toast({ html: err.response.data.message })
        })
    },
    addCart ({ commit, dispatch }, productData) {
      commit('SET_LOADING', true)
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
          M.toast({ html: err.response.data.message })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    getCart ({ commit, dispatch }) {
      commit('SET_LOADING', true)
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
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    changeAmt ({ commit, dispatch }, change) {
      commit('SET_LOADING', true)
      axios({
        method: 'PATCH',
        url: `${this.state.heroku}/cart/${change.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          amount: change.amount
        }
      })
        .then(response => {
          dispatch('getCart')
          M.toast({ html: `changed amount to ${response.data.amount}` })
        })
        .catch(err => {
          console.log(err.response.data)
          M.toast({ html: err.response.data.message })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    remove ({ commit, dispatch }, destroy) {
      commit('SET_LOADING', true)
      axios({
        method: 'DELETE',
        url: `${this.state.heroku}/cart/${destroy.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          dispatch('getCart')
          M.toast({ html: response.data.message })
        })
        .catch(err => {
          console.log(err.response.data)
          M.toast({ html: err.response.data.message })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    checkout ({ commit, dispatch }) {
      commit('SET_LOADING', true)
      axios({
        method: 'PATCH',
        url: `${this.state.heroku}/cart`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          dispatch('getCart')
          M.toast({ html: response.data.message })
        })
        .catch(err => {
          console.log(err.response.data)
          M.toast({ html: err.response.data.message })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    }
  },
  modules: {
  }
})
