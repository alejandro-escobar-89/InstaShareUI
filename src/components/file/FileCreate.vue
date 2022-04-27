<template>
  <div class="d-flex align-items-center justify-content-between gap-4">
    <h2 class="mb-0">Upload file</h2>
    <router-link :to="{name: 'userDashboard'}" class="btn btn-outline-secondary">
      <i class="bi bi-arrow-90deg-left me-2"></i>Back
    </router-link>
  </div>
  <hr class="mb-5">

  <form @submit.prevent="upload" class="card rounded-3 shadow-lg my-5 max-w-2 mx-auto">
    <div class="card-body p-4 px-sm-5">
      <h3 class="text-primary text-center mt-3 mb-5">Share a file with the community</h3>

      <div class="mb-4">
        <label for="name" class="form-label">File name</label>
        <input type="text" id="name" name="name" class="form-control" v-model.trim="file.name">
        <div class="form-text">If you leave this blank, the current file name will be used.</div>
      </div>

      <div class="mb-3">
        <input type="file" id="content" name="content" ref="content" class="form-control" required @change="updateContent">
        <div class="form-text">Max. file size: 20 MB</div>
      </div>

      <div class="text-end">
        <button type="submit" class="btn btn-primary mb-3" :disabled="uploading">
          <i class="bi bi-upload me-2"></i>{{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'FileCreate',
    data() {
      return {
        uploading: false,
        file: {
          name: '',
          content: '',
        },
      }
    },
    methods: {
      updateContent() {
        this.file.content = this.$refs.content.files[0];
      },

      upload() {
        this.uploading = true;

        // Preparing the payload to be sent with the file.
        const headers = { 'Content-Type': 'multipart/form-data' };
        const formData = new FormData();
        formData.append('name', this.file.name);
        formData.append('content', this.file.content);

        this.axios.post('/api/files', formData, { headers }).then(() => {
          this.$router.push({name: 'userDashboard'});
        }).catch(error => {
          if (error.response) {
            alert('Error! ' + error.response.data.message + ':\n\n' + error.response.data.errors[0]);
          } else {
            alert('An error has occured while processing your request.');
          }
        }).finally(() => {this.uploading = false});
      },
    }
  }
</script>