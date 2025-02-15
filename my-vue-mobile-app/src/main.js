import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useDemoStore } from './store/demoStore';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');


const vueApp = createApp(App);
const pinia = createPinia();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.use(router);
app.use(pinia);

const store = useDemoStore();
store.checkAuth().then(() => {
  app.mount('#app');
});