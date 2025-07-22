import type {
  RouteLocationNormalizedGeneric,
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
const whiteListByPath: string[] = ['/login']
const whiteListByName: RouteRecordNameGeneric[] = []
export function isWhiteList(to: RouteLocationNormalizedGeneric) {
  return whiteListByPath.includes(to.path) || whiteListByName.includes(to.name)
}
import Blackjack from '@/views/blackjack/Blackjack.vue';
import BlackjackOverview from '@/views/blackjack/BlackjackOverview.vue';
import BlackjackTables from '@/views/blackjack/BlackjackTables.vue';
import BlackjackTable from '@/views/blackjack/BlackjackTable.vue';
const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/auth/LoginView.vue'),
    name: 'Login',
    meta: {
      title: '登录',
    },
    // beforeEnter: requireCheckLogin,
  },
  {
    path: '/blackjack',
    component: Blackjack,
    children: [
      {
        path: '',
        name: 'BlackjackOverview',
        component: BlackjackOverview
      },
      {
        path: 'tables',
        name: 'BlackjackTables',
        component: BlackjackTables
      },
      {
        path: 'table/:tableId',
        name: 'BlackjackTable',
        component: BlackjackTable
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'), // A
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/tournaments',
    name: 'TournamentList',
    component: () => import('@/views/TournamentsView.vue'), // A
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/battles',
    name: 'Battles',
    component: () => import('@/components/races/FunRizeRaces.vue'), // A
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/redtiger',
    name: 'RtgGame',
    component: () => import('@/views/RtgGame.vue'),
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/nolimit',
    name: 'NolimitGame',
    component: () => import('@/views/NolimitGame.vue'), // A
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/netgame',
    name: 'NetGameGame',
    component: () => import('@/views/NetGameGame.vue'), // A
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/netgame/:game',
    name: 'NetGameGame',
    component: () => import('@/views/NetGameGame.vue'), // A
    // props: false, // Passes route params as props to the component
  },
  {
    path: '/home',
    component: () => import('@/views/HomeView.vue'),
    name: 'Home',
    meta: {
      title: '首页',
      layout: {
        navBar: {
          showNavBar: false,
          showLeftArrow: false,
        },
        tabbar: {
          showTabbar: true,
          icon: 'home-o',
        },
      },
    },
    // beforeEnter: requireAuth,
  },
  // {
  //   path: '/games/nolimit',
  //   name: 'Nolmiit',
  //   component: () => import('@/views/games/NoLimit.vue'),
  // },
]

/** 路由实例 */
export const router = createRouter({
  history: createWebHistory(VITE_PUBLIC_PATH),
  // VITE_ROUTER_HISTORY === 'hash'
  //   ? createWebHashHistory(VITE_PUBLIC_PATH)
  //   : createWebHistory(VITE_PUBLIC_PATH),
  routes: [...routes],
})
router.beforeEach((_to, _from, next) => {
  console.log('x')
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && _to.path !== '/login' && _to.path !== '/redtiger') {
    next('/login')
  } else {
    next()

  }
  // globalStore.startLoading()
})

router.afterEach(() => {
  // const globalStore = useGlobalStore()
  // globalStore.finishLoading()
})
