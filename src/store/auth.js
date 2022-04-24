import { reactive } from 'vue';

export const auth = reactive({
  authenticated: false,
  user: {},
  setUser(value) {
    this.user = value;
    this.authenticated = Object.keys(this.user).length > 0;
  }
});