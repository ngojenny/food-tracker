import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Confirm from '@/components/Confirm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      exact: true
    }, 
    {
      path: '/:id',
      name: 'Dashboard',
      component: Dashboard,
      exact: true
    },
    {
      path: '/:id/delete/:entryId',
      name: 'Confirm',
      component: Confirm,
      exact: true
    }
  ]
})
