import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Detail from '../components/detail/detail'

Vue.use(Router)

export default new Router({
  routes: [{
  	path: '/', component: Home
  },{
  	path: '/detail/:id', component: Detail  //动态路径参数，以冒号开头
  }]
})
