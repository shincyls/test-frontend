import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const Main = () => import('../pages/Main.vue')
const Login = () => import('../pages/Login.vue')
const Dashboard = () => import('../pages/Dashboard.vue')
const Locations = () => import('../pages/Locations.vue')
const Admins = () => import('../pages/Admins.vue')
const Users = () => import('../pages/Users.vue')
const Sellers = () => import('../pages/Sellers.vue')
const Products = () => import('../pages/Products.vue')
const Sales = () => import('../pages/Sales.vue')
const Orders = () => import('../pages/Orders.vue')
const Setting = () => import('../pages/Setting.vue')


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admins',
    name: 'Admins',
    component: Admins,
    meta: { requiresAuth: true }
  },{
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },{
    path: '/locations',
    name: 'Locations',
    component: Locations,
    meta: { requiresAuth: true }
  },{
    path: '/sellers',
    name: 'Sellers',
    component: Sellers,
    meta: { requiresAuth: true }
  },{
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { requiresAuth: true }
  },{
    path: '/sales',
    name: 'Sales',
    component: Sales,
    meta: { requiresAuth: true }
  },{
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { requiresAuth: true }
  },{
    path: '/settings',
    name: 'Setting',
    component: Setting,
    meta: { requiresAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // catch params and query
    const { params, query } = to
    // redirect to dashboard with params and query
    next({ name: 'Dashboard', params, query })
  } else {
    next()
  }
})

export default router
