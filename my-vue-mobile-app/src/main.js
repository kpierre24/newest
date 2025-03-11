import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faCity, faGlobe, faLocation } from '@fortawesome/free-solid-svg-icons';
import { faUser, faPhone, faEnvelope, faLock, faCalendarAlt, faVenusMars} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/global.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

// Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#6362F8',
          secondary: '#FFBC2D',
        },
      },
    },
  },
});

app.use(vuetify);

// Add the icons you want to use to the library
library.add(faArrowLeft);
library.add(faPhone);
library.add(faEnvelope);
library.add(faUser);
library.add(faLock);
library.add(faCalendarAlt);
library.add(faVenusMars);
library.add(faGlobe);
library.add(faLocation);
library.add(faCity);

// Register FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');