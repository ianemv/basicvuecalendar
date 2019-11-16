/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import VueRouter from 'vue-router';

window.Vue = require('vue');

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {routes} from './routes';
import moment from 'moment'
import Vue           from 'vue'
import Notifications from 'vue-notification'


Vue.prototype.moment = moment
Vue.prototype.$eventHub = new Vue();

Vue.use(Notifications)
Vue.use(VueRouter);

import MainApp from './components/MainApp.vue';

const router = new VueRouter({
    routes,
    mode: 'history'
});

const app = new Vue({
    el: '#app',
    router,
    components:{
        MainApp
    }
});
