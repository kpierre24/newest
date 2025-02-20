import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUser, faPhone, faEnvelope, faLock, faCalendarAlt, faVenusMars} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(vuetify);

// Add the icons you want to use to the library
library.add(faArrowLeft);
library.add(faPhone);
library.add(faEnvelope);
library.add(faUser);
library.add(faLock);
library.add(faCalendarAlt);
library.add(faVenusMars);

// Register FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');