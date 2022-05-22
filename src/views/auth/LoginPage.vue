<template>
  <form @submit.prevent="doLogin" class="card rounded-3 shadow-lg my-5 max-w-1 mx-auto">
    <div class="card-body p-4 px-sm-5">
      <h3 class="text-primary text-center mt-3 mb-5">Log in to your account</h3>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" id="email" name="email" placeholder="name@example.com" class="form-control" required v-model="credentials.email">
      </div>

      <div class="mb-4">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" name="password" class="form-control" required v-model="credentials.password">
      </div>

      <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="processing">
        {{ processing ? 'Accessing...' : 'Login' }}
      </button>
    </div>

    <div class="card-footer p-3">
      <p class="text-center mb-0">Don't have an account yet? <router-link :to="{name: 'register'}">Register here</router-link>.</p>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';

  const router = useRouter();
  const processing = ref(false);
  const { login } = useAuthStore();

  let credentials = {
    email: '',
    password: '',
  };

  const doLogin = () => {
    processing.value = true;

    login(credentials, () => {
      router.push({name: 'userDashboard'});
    }, () => {
      processing.value = false;
    });
  }
</script>
