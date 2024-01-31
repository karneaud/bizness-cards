import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
//import Profile from './components/Profile.vue'
//import Card from './components/Card.vue'
import Business from '../components/Business.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    /*{
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: route => ({ user: route.params.user || null })
    },
    {
      path: '/card',
      name: 'Card',
      component: Card,
      props: route => ({ business: route.params.business }),
      beforeEnter: (to, from, next) => {
        if (!to.params.business) {
          next({ name: 'Home' })
        } else {
          next()
        }
      }
    },*/
    {
      path: '/business',
      name: 'Business',
      component: Business,
      props: route => ({ business: route.params.business || null })
    }
  ]
})

export default router