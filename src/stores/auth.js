import { defineStore } from 'pinia';
import { useAppStore } from '../stores/app';

const storedTokenKeyName = 'InstaShareUserToken';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: {},
  }),

  actions: {
    register(credentials, onSuccess = undefined, onError = undefined) {
      const { showError } = useAppStore();

      window.axios.post('/register', credentials).then(({data}) => {
        try {
          localStorage.setItem(storedTokenKeyName, data.token);
        } catch (error) {
          console.log('Unable to store user token');
        }

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
        try {
          localStorage.setItem(storedTokenKeyName, data.token);
        } catch (error) {
          console.log('Unable to store user token');
        }

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
        try {
          localStorage.removeItem(storedTokenKeyName);
        } catch (error) {
          console.log('Unable to delete user token');
        }

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
      const token = localStorage.getItem(storedTokenKeyName);

      if (token) {
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

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
