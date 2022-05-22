import { defineStore } from 'pinia';
import { useAppStore } from '../stores/app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: {},
  }),

  actions: {
    register(credentials, onSuccess = undefined, onError = undefined) {
      const { showError } = useAppStore();

      window.axios.post('/register', credentials).then(({data}) => {
        this.authenticated = true;
        this.user = data.user;
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        if (onSuccess) {
          onSuccess();
        }
      }).catch(error => {
        showError(error);

        if (onError) {
          onError();
        }
      });
    },

    login(credentials, onSuccess = undefined, onError = undefined) {
      const { showError } = useAppStore();

      window.axios.post('/login', credentials).then(({data}) => {
        this.authenticated = true;
        this.user = data.user;
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        if (onSuccess) {
          onSuccess();
        }
      }).catch(error => {
        showError(error);

        if (onError) {
          onError();
        }
      });
    },

    logout(onSuccess = undefined, onError = undefined) {
      const { showError } = useAppStore();

      window.axios.post('/logout').then(() => {
        this.authenticated = false;
        this.user = {};
        window.axios.defaults.headers.common['Authorization'] = '';

        if (onSuccess) {
          onSuccess();
        }
      }).catch(error => {
        showError(error);

        if (onError) {
          onError();
        }
      });
    },

    checkAuthenticated(onAuthenticated = undefined, onUnauthenticated = undefined) {
      const { showError } = useAppStore();

      window.axios.get('/user').then(({data}) => {
        this.authenticated = true;
        this.user = data;

        if (onAuthenticated) {
          onAuthenticated();
        }
      }).catch(error => {
        if (error.response.status === 401) {
          this.authenticated = false;
          this.user = {};

          if (onUnauthenticated) {
            onUnauthenticated();
          }
        } else {
          showError(error);
        }
      });
    }
  },
});
