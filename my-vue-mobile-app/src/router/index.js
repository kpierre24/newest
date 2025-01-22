import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import BasicInfo from '../components/BasicInfo.vue';
import Address from '../components/Address.vue';
import Home from '../views/Home.vue';
import NewOrExistingCustomer from '../components/NewOrExistingCustomer.vue';
import GettingReady from '../components/GettingReady.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', component: Login },
  { path: '/basic-info', component: BasicInfo },
  { path: '/address', component: Address },
  { path: '/new-or-existing-customer', component: NewOrExistingCustomer },
  { path: '/getting-ready', component: GettingReady },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;