import VueRouter from 'vue-router'
import auth from './config/auth'
import Dashboard from './pages/Dashboard.vue'
import Login from './pages/Login.vue'

function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
        path: '/login',
        query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

const afterAuth = (_to, from, next) => {
    if (auth.loggedIn) {
      next(from.path)
    } else {
      next()
    }
}
  
export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
        { path: '/login', component: Login,  beforeEnter: afterAuth  },
        { path: '/logout', 
            beforeEnter (to, from, next) {
                auth.logout()
                next('/')
            }
        }
    ]
})