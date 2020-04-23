import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import LoginRegister from '../views/LoginRegister.vue'
import Checkout from '../views/Checkout.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/products',
        name: 'Products',
        component: ProductList
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
      },
      {
        path: '/history',
        name: 'History',
        component: History
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginRegister
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
