import Vue from 'vue'
import App from './StockDetailsPage.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#stockDetailsPage')
