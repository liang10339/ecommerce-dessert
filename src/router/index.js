import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () => import('../views/Detail.vue')
      }
    ]
  },

  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
