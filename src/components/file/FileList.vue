<template>
  <h2 class="mb-0">Files shared by the community</h2>
  <hr class="mb-5">

  <div class="text-center mt-6" v-if="loading">
    <img :src="require('@/assets/images/preloader.svg')" alt="Loading...">
  </div>
  <div v-else>
    <div class="d-flex flex-wrap gap-5 justify-content-start file-container" v-if="files.length > 0">
      <div class="file-wrapper" v-for="file in files" :key="file.id">
        <div class="card shadow">
          <router-link
              :to="{name: 'fileShow', params: {id: file.id}}"
              class="card-body overflow-hidden d-flex justify-content-center align-items-center"
          >
            <span class="fs-1 fw-bold text-uppercase text-break text-center lh-1">.{{ file.ext }}</span>
          </router-link>

          <div class="card-footer fs-5 d-flex justify-content-between">
            <button class="btn btn-sm btn-primary w-100" v-if="file.compressed" @click="downloadFile(file)">
              <i class="bi bi-download me-2"></i>Download
            </button>
            <div class="text-muted text-center small w-100" v-else>Compressing</div>
          </div>
        </div>

        <p class="text-center small p-2 pb-0 file-name">{{ file.name }}</p>
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

  <ToastWidget>Your file is downloading...</ToastWidget>
</template>

<script>
  import { Toast } from 'bootstrap';

  export default {
    name: 'FileList',
    data() {
      return {
        loading: false,
        files: [],
      }
    },
    mounted() {
      this.loadFiles();
    },
    methods: {
      loadFiles() {
        this.loading = true;

        this.axios.get('/api/files').then(response => {
          this.files = response.data;
        }).catch(() => {
          alert('An error has occured while processing your request.');
          this.files = [];
        }).finally(() => {this.loading = false});
      },

      downloadFile(file) {
        // This library works as a helper for JS downloads, since this is not a straight forward process.
        const fileDownload = require('js-file-download');

        this.axios({
          url: `/api/files/download/${file.id}`,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          fileDownload(response.data, `${file.name}.${file.ext}`);
          (new Toast(document.getElementById('live-toast'))).show();
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

<style scoped>
  .file-container {
    row-gap: 2rem !important;
  }

  .file-wrapper {
    width: 140px;
  }

  .file-container .file-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    user-select: none;
  }

  .card {
    height: 150px;
  }

  .card .card-body {
    color: #929292;
    transition: 0.2s background-color;
  }

  .card .card-body:hover {
    background-color: #f7f7f7;
  }

  .card .card-footer button {
    opacity: 0.7;
    transition: 0.2s opacity;
  }

  .card .card-footer button:hover {
    opacity: 1;
  }
</style>