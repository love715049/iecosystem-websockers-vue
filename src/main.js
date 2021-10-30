import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Echo from 'laravel-echo'

const echo = {}
echo.install = function (Vue) {
  Vue.prototype.$pusher = require('pusher-js')
  Vue.prototype.$echo = new Echo({
    // authEndpoint: 'http://your-domain.test/api/broadcasting/auth',
    // auth: {
    //   headers: {
    //     Authorization: 'Bearer XXXXXXXXXXXX',
    //   }
    // },
    broadcaster: 'pusher',
    key: 'laravel-websockets-key',
    // ws://192.168.1.105:8080/sockjs-node/345/xwmzvt4x/websocket
    // wsHost: window.location.hostname,  //TODO
    wsHost: 'iecosystem-api.tomyue.cc',  //TODO
    wsPort: 6002,
    wssPort: 6002,
    forceTLS: true,
    enabledTransports: ['ws', 'wss']
  })
}
//console.log('wsHost:', window.location.hostname) // localhost
Vue.config.productionTip = false
Vue.use(echo)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  created () {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    // axios.interceptors.response.use(
    //   response => response,
    //   error => {
    //     if (error.response.status === 401) {
    //       this.$store.dispatch('logout')
    //     }
    //     return Promise.reject(error)
    //   }
    // )
  },
  render: h => h(App)
}).$mount('#app')
