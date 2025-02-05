import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/components/Login.vue';
import BasicInfo from '@/components/BasicInfo.vue';
import Address from '@/components/Address.vue';
import NewOrExistingCustomer from '@/components/NewOrExistingCustomer.vue';
import GettingReady from '@/components/GettingReady.vue';
import EmailVerification from '@/components/EmailVerification.vue';
import IDInformation from '@/components/IDInformation.vue';
import ChildIDInformation from '@/components/ChildIDInformation.vue';
import MobileVerification from '@/components/MobileVerification.vue';
import MembershipDeclarationAgreement from '@/components/MembershipDeclarationAgreement.vue';
import DueDiligence from '@/components/DueDiligence.vue';
import MailingAddress from '@/components/MailingAddress.vue';
import ForeignNationalBankInformation from '@/components/ForeignNationalBankInformation.vue';
import EmploymentInformation from '@/components/EmploymentInformation.vue';
import PoliticallyExposedPersons from '@/components/PoliticallyExposedPersons.vue';
import PoliticallyExposedPersons2 from '@/components/PoliticallyExposedPersons2.vue';
import DesignationOfBeneficiary from '@/components/DesignationOfBeneficiary.vue';
import PowerofAttorney from '@/components/PowerofAttorney.vue';
import Branch from '@/components/Branch.vue';
import Success from '@/components/Success.vue';
import ParentGuardianInformation from '@/components/ParentGuardianInformation.vue';
import AccountNumber from '@/components/AccountNumber.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/basic-info', name: 'BasicInfo', component: BasicInfo },
  { path: '/address', component: Address },
  { path: '/new-or-existing-customer', component: NewOrExistingCustomer },
  { path: '/getting-ready', component: GettingReady },
  { path: '/email-verification', name: 'EmailVerification', component: EmailVerification },
  { path: '/id-information', name: 'IdInformation', component: IDInformation },
  { path: '/child-id-information', name: 'ChildIdInformation', component: ChildIDInformation },
  { path: '/mobile-verification', component: MobileVerification },
  { path: '/membership-declaration-agreement', name: 'MembershipDeclarationAgreement', component: MembershipDeclarationAgreement },
  { path: '/due-diligence', name: 'DueDiligence', component: DueDiligence },
  { path: '/mailing-address', name: 'MailingAddress', component: MailingAddress },
  { path: '/foreign-national-bank-information', name: 'ForeignNationalBankInformation', component: ForeignNationalBankInformation },
  { path: '/employment-information', name: 'EmploymentInformation', component: EmploymentInformation },
  { path: '/politically-exposed-persons', name: 'PoliticallyExposedPersons', component: PoliticallyExposedPersons },
  { path: '/politically-exposed-persons-2', name: 'PoliticallyExposedPersons2', component: PoliticallyExposedPersons2 },
  { path: '/designation-of-beneficiary', name: 'DesignationOfBeneficiary', component: DesignationOfBeneficiary },
  { path: '/power-of-attorney', name: 'PowerofAttorney', component: PowerofAttorney },
  { path: '/branch', name: 'Branch', component: Branch },
  { path: '/success', name: 'Success', component: Success },
  { path: '/parent-guardian-information', name: 'ParentGuardianInformation', component: ParentGuardianInformation },
  { path: '/account-number', name: 'AccountNumber', component: AccountNumber }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;