import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },

    {
        path: '/assets',
        name: 'Assets',
        component: () =>
            import ('../views/Assets.vue')
    },
    {
        path: '/logs',
        name: 'Logs',
        component: () =>
            import ('../views/Logs.vue')
    },
    {
        path: '/statistics',
        name: 'Charts',
        component: () =>
            /* webpackChunkName: "asset" */
            import ('../views/Statistics.vue')
    },
    {
        path: '/config',
        name: 'Config',
        component: () =>
            import ('../views/Config.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router