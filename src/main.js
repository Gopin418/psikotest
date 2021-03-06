import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.defaults.timeout = 10000
axios.interceptors.request.use(
  config => {
    const token = window.$cookies.get('token')
    if (token) {
      config.headers.common.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
