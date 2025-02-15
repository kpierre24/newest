import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useDemoStore } from './store/demoStore';


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const store = useDemoStore();
store.checkAuth().then(() => {
  app.mount('#app');
});