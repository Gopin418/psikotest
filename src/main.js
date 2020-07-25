import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'
import VueCookies from 'vue-cookies'
import api from './api.js'

Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.prototype.$http = api
api.defaults.timeout = 10000

api.interceptors.request.use(
  config => {
    const token = window.$cookies.get('token')
    if (token) {
      config.headers.common.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
