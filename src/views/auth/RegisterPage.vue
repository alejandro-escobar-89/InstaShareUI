<template>
  <form @submit.prevent="register" class="card rounded-3 shadow-lg my-5 max-w-1  mx-auto">
    <div class="card-body p-4 px-sm-5">
      <h3 class="text-primary text-center mt-3 mb-5">Sign up for free</h3>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" name="name" class="form-control" required v-model="credentials.name">
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" id="email" name="email" placeholder="name@example.com" class="form-control" required v-model="credentials.email">
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" name="password" class="form-control" required v-model="credentials.password">
      </div>

      <div class="mb-4">
        <label for="password_confirmation" class="form-label">Confirm your password</label>
        <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" required v-model="credentials.password_confirmation">
      </div>

      <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="processing">
        {{ processing ? 'Registering...' : 'Sign up' }}
      </button>
    </div>

    <div class="card-footer p-3">
      <p class="text-center mb-0">Already a member? <router-link :to="{name: 'login'}">Login here</router-link>.</p>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../../stores/user';
  import { useRouter } from 'vue-router';
  import { useAppStore } from '../../stores/app';

  const router = useRouter();
  const { checkAuthenticated } = useUserStore();
  const { showError } = useAppStore();
  const processing = ref(false);

  let credentials = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const register = () => {
    processing.value = true;

    window.axios.post('/register', credentials).then(() => {
      checkAuthenticated(() => {
        router.push({name: 'userDashboard'});
      });
    }).catch(error => {
      processing.value = false;
      showError(error);
    });
  }
</script>