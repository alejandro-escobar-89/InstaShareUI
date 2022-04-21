<template>
  <div v-if="loading">
    <p class="text-center mt-3">Loading...</p>
  </div>
  <div v-else>
    <div class="d-flex flex-wrap gap-4 justify-content-center" v-if="files.length > 0">
      <div class="card shadow-sm" v-for="file in files" :key="file.id">
        <a href="#" class="card-body overflow-hidden d-flex justify-content-center align-items-center">
          <span class="text-muted fs-1 fw-bold text-uppercase text-break text-center lh-1">.{{ file.ext }}</span>
        </a>

        <div class="card-footer fs-5 d-flex justify-content-between">
          <i class="bi bi-download"></i>
          <i class="bi bi-pencil-square"></i>
          <i class="bi bi-x-square-fill text-danger"></i>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-3">Nobody has shared a file with the community yet. Be the first!</p>

      <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
        <router-link :to="{name: 'register'}" class="btn rounded-pill btn-primary">Sign up</router-link>
        <span class="fs-5">or</span>
        <router-link :to="{name: 'login'}" class="btn rounded-pill btn-secondary">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FileList',
    data() {
      return {
        loading: false,
        files: [],
      }
    },
    mounted() {
      this.getFiles();
    },
    methods: {
      getFiles() {
        this.loading = true;

        this.axios.get('/api/files').then(response => {
          this.files = response.data;
        }).catch(() => {
          alert('An error has occured while proccessing your request.');
          this.files = [];
        }).finally(() => {this.loading = false});
      },
    }
  }
</script>

<style scoped>
  .card {
    width: 140px;
    height: 150px;
  }

  .card .card-footer i {
    cursor: pointer;
  }
</style>