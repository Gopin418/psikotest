import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'
import FirstTest from '../views/FirstTest.vue'
import SecondTest from '../views/SecondTest.vue'
import Cfit from '../views/CFIT.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
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
    name: 'SecondTest',
    component: SecondTest
  },
  {
    path: '/cfit',
    name: 'CFIT',
    component: Cfit
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

const openRoutes = ['login']

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    if (!window.$cookies.get('user')) {
      next()
    } else {
      next('/menu')
    }
  } else if (window.$cookies.get('user')) {
    next()
  } else {
    next('/')
  }
})

export default router
