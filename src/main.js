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
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api.js'

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  mounted () {
    api.interceptors.request.use(
      config => {
        const token = window.$cookies.get('token')
        if (token) {
          config.headers.Authorization = token
        }
        return config
      },
      error => {
        return Promise.reject(error)
      })
  },
  render: h => h(App)
}).$mount('#app')
