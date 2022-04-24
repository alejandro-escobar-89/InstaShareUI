<template>
  <div class="d-flex align-items-center justify-content-between gap-4">
    <h2 class="mb-0">Edit file's metadata</h2>
    <router-link :to="{name: 'userDashboard'}" class="btn btn-outline-secondary">
      <i class="bi bi-arrow-90deg-left me-2"></i>Back
    </router-link>
  </div>
  <hr class="mb-5">

  <div class="text-center mt-6" v-if="loading">
    <img :src="require('@/assets/images/preloader.svg')" alt="Loading...">
  </div>
  <div v-else>
    <form @submit.prevent="update" class="card rounded-3 shadow-lg my-5 max-w-2 mx-auto">
      <div class="card-body p-4 px-sm-5">
        <h3 class="text-primary text-center mt-3 mb-5">Edit this file's name</h3>

        <div class="mb-4">
          <label for="name" class="form-label">File name</label>
          <input type="text" id="name" name="name" class="form-control" required v-model.trim="file.name">
        </div>

        <div class="text-end">
          <button type="submit" class="btn btn-primary mb-3"><i class="bi bi-upload me-2"></i>Update</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'FileEdit',
    data() {
      return {
        loading: false,
        file: {},
      }
    },
    mounted() {
      this.loadFile();
    },
    methods: {
      loadFile() {
        this.loading = true;

        this.axios.get(`/api/files/${this.$route.params.id}`).then(response => {
          this.file.name = response.data.name;
        }).catch(error => {
          if (error.response) {
            alert('Error! ' + error.response.data.message);
          } else {
            alert('An error has occured while processing your request.');
          }
        }).finally(() => {this.loading = false});
      },

      update() {
        this.axios.put(`/api/files/${this.$route.params.id}`, this.file).then(() => {
          this.$router.back();
        }).catch(error => {
          if (error.response) {
            alert('Error! ' + error.response.data.message);
          } else {
            alert('An error has occured while processing your request.');
          }
        });
      },
    }
  }
</script>