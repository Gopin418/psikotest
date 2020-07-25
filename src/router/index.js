import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Menu from '../views/Menu.vue'
import FirstTest from '../views/FirstTest.vue'
import Pauli from '../views/Pauli.vue'
import Cfit from '../views/CFIT.vue'
import Surveys from '../views/Surveys.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  {
    path: '/first-test',
    name: 'FirstTest',
    component: FirstTest
  },
  {
    path: '/second-test',
    name: 'Pauli',
    component: Pauli
  },
  {
    path: '/cfit',
    name: 'CFIT',
    component: Cfit
  },
  {
    path: '/surveys',
    name: 'Surveys',
    component: Surveys
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

const openRoutes = ['login', 'register']

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    if (!window.$cookies.get('token')) {
      next()
    } else {
      next('/menu')
    }
  } else if (window.$cookies.get('token')) {
    next()
  } else {
    next('/')
  }
})

export default router
