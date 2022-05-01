import { defineStore } from 'pinia';
import { useAppStore } from '../stores/app';

export const useUserStore = defineStore('user', {
  state: () => ({
    authenticated: false,
    user: {},
  }),

  actions: {
    checkAuthenticated(onAuthenticated = null, onUnauthenticated = null) {
      const { showError } = useAppStore();

      window.axios.get('/api/user').then(({data}) => {
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
