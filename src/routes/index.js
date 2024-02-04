import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
//import Profile from './components/Profile.vue'
import Card from '../components/Card.vue'
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
    },*/
    {
      path: '/card/:id',
      name: 'Card',
      component: Card,
      props: route => ({ id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!to.params.id) {
          next({ name: 'Home' })
        } else {
          next()
        }
      }
    },
    {
      path: '/business/:id?',
      name: 'Business',
      component: Business,
      props: route => ({ id: route.params.id || null })
    }
  ]
})

export default router