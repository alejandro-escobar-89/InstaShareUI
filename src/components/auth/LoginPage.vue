<template>
  <form @submit.prevent="login" class="card rounded-3 shadow-lg my-5 max-w-1 mx-auto">
    <div class="card-body p-3 px-sm-5 pt-sm-5 pb-3">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" id="email" name="email" placeholder="name@example.com" class="form-control" required v-model="credentials.email">
      </div>

      <div class="mb-4">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" name="password" class="form-control" required v-model="credentials.password">
      </div>

      <input type="submit" value="Login" class="btn btn-primary w-100 mb-4">
    </div>

    <div class="card-footer p-3">
      <p class="text-center mb-0">Don't have an account yet? <router-link :to="{name: 'register'}">Register here</router-link>.</p>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      login() {
        this.axios.get('/sanctum/csrf-cookie').then(() => {
          this.axios.post('/login', this.credentials).then(() => {
            this.$router.push({name: 'userDashboard'});
          }).catch(error => {
            if (error.response) {
              alert('Error! ' + error.response.data.message);
            } else {
              alert('An error has occured while proccessing your request.');
            }
          });
        });
      }
    }
  }
</script>