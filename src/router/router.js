import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/Home";
import application from "../views/Application";
import config from "../views/Config";

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/about.vue')
    },
    {
        path: '/config',
        name: 'config',
        component: config
    },
    {
        path: '/application',
        name: 'application',
        component: application
    }
];

const router = new VueRouter({
    routes
});

export default router