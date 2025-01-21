import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import BasicInfo from '../components/BasicInfo.vue';
import Address from '../components/Address.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/basic-info', component: BasicInfo },
  { path: '/address', component: Address },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;