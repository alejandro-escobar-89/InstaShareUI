require('./bootstrap');

import { createApp } from 'vue';
import router from './routes';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App'

createApp(App).use(router).use(VueAxios, axios).mount('#app');
