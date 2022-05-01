require('./bootstrap');

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App'
import './assets/css/app.css';

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .use(createPinia())
  .mount('#app');
