window._ = require('lodash');

import './assets/sass/app.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Echo from 'laravel-echo';

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
  forceTLS: true
});
