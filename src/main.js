import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import Toast from 'components/common/toast'
Vue.use(Toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad, {

})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
