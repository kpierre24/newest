import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import BasicInfo from '../components/BasicInfo.vue';
import Address from '../components/Address.vue';
import NewOrExistingCustomer from '../components/NewOrExistingCustomer.vue';
import GettingReady from '../components/GettingReady.vue';
import EmailVerification from '../components/EmailVerification.vue';
import MembershipDeclarationAgreement from '../components/MembershipDeclarationAgreement.vue';
import IDInformation from '../components/IDInformation.vue';
import ChildIDInformation from '../components/ChildIDInformation.vue';
import MobileVerification from '../components/MobileVerification';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', component: Login },
  { path: '/basic-info', component: BasicInfo },
  { path: '/address', component: Address },
  { path: '/new-or-existing-customer', component: NewOrExistingCustomer },
  { path: '/getting-ready', component: GettingReady },
  { path: '/email-verification', component: EmailVerification },
  { path: '/membership-declaration-agreement', component: MembershipDeclarationAgreement },
  { path: '/id-information', component: IDInformation },
  { path: '/child-id-information', component: ChildIDInformation },
  { path: '/mobile-verification', component: MobileVerification }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;