import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register'
import UserList from '../components/UserList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
