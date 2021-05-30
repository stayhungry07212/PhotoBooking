import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as firebase from './firebase'
import store from './store'

Vue.use(vuetify, {
  theme: {
    primary: '#f7971e'
  }
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  router,
  firebase,
  render: h => h(App)
}).$mount('#app')
