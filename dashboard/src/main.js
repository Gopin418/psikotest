import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueSessionStorage from 'vue-sessionstorage'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(VueSessionStorage)

axios.defaults.timeout = 10000
axios.interceptors.request.use(
  config => {
    const token = Vue.prototype.$session.get('token')
    if (token) {
      config.headers.common.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
Vue.use(VueCookies)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
