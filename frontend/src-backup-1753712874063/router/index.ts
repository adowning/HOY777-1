import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/index.vue')
      },
      {
        path: 'affiliate',
        name: 'Affiliate',
        component: () => import('@/views/affiliate/index.vue'),
      },
      {
        path: 'bonus-transaction',
        name: 'Bonuses And Transactions',
        component: () => import('@/views/bonus_transaction/index.vue'),
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/account/index.vue'),
      },
      {
        path: 'vip',
        name: 'VIP',
        component: () => import('@/views/vip/index.vue'),
      },
      {
        path: 'game/:id?/:name?/:demo?',
        name: 'Game',
        component: () => import('@/views/game/index.vue'),
      },
      {
        path: 'sports',
        name: 'Sports',
        component: () => import('@/views/sports/index.vue'),
      },
      {
        path: 'about-us',
        name: 'About_US',
        component: () => import('@/views/about_us/index.vue'),
      },
      {
        path: 'provider',
        name: 'Provider',
        component: () => import('@/views/provider/index.vue'),
      },
      {
        path: 'promo',
        name: 'Promo',
        component: () => import('@/views/promo/index.vue'),
      },
      {
        path: 'promo/detail',
        name: 'Promo_Detail',
        component: () => import('@/views/promo/detail/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
})

export default router
