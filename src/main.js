// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Tabbar,TabbarItem,Stepper,PullRefresh,Button, Row , Col, Swipe, SwipeItem,Lazyload,Field,NavBar,List,Tab,Tabs} from 'vant'

Vue.use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(Field).use(NavBar).use(List).use(Tab).use(Tabs)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
