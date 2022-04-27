<template>
  <h2 class="mb-0">Files shared by the community</h2>
  <hr class="mb-3">

  <p v-if="!loading && !error && (files.length > 0)" class="mb-4-5 text-end small text-muted">
    The <i class="bi bi-check-circle-fill text-success opacity-75 fs-6"></i> icon means the file is compressed and ready to download, as opposed to the <i class="bi bi-exclamation-circle-fill text-warning opacity-75 fs-6"></i> icon.
  </p>

  <div class="text-center mt-6" v-if="loading">
    <img :src="require('@/assets/images/preloader.svg')" alt="Loading...">
  </div>
  <div v-else>
    <div class="alert alert-danger d-flex align-items-center max-w-2 mx-auto mt-5" role="alert" v-if="error">
      <i class="bi bi-exclamation-triangle-fill fs-3 me-3"></i>
      <div>Sorry. We were unable to load the file list. Please check the logs for more info.</div>
    </div>
    <div v-else>
      <div class="d-flex flex-wrap gap-5 justify-content-start file-container" v-if="files.length > 0">
        <div class="file-wrapper" v-for="file in files" :key="file.id">
          <div class="card shadow position-relative">
            <i v-if="file.compressed" class="bi bi-check-circle-fill text-success opacity-75 fs-4 position-absolute top-0 start-0 translate-middle"></i>
            <i v-else class="bi bi-exclamation-circle-fill text-warning opacity-75 fs-4 position-absolute top-0 start-0 translate-middle"></i>

            <router-link
                :to="{name: 'fileShow', params: {id: file.id}}"
                class="card-body overflow-hidden d-flex justify-content-center align-items-center"
            >
              <span class="fs-1 fw-bold text-uppercase text-break text-center lh-1">.{{ file.ext }}</span>
            </router-link>

            <div class="card-footer fs-5 d-flex justify-content-between">
              <button class="btn btn-sm btn-primary w-100" :disabled="!file.compressed" @click="downloadFile(file)">
                <i class="bi bi-download me-2"></i>Download
              </button>
            </div>
          </div>

          <p class="text-center small p-2 pb-0 file-name">{{ file.name }}</p>
        </div>
      </div>
      <div v-else>
        <p class="text-center mt-5">Nobody has shared a file with the community yet. Be the first!</p>

        <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
          <router-link :to="{name: 'register'}" class="btn rounded-pill btn-primary">Sign up</router-link>
          <span class="fs-5">or</span>
          <router-link :to="{name: 'login'}" class="btn rounded-pill btn-secondary">Login</router-link>
        </div>
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
        error: false,
        files: [],
      }
    },
    mounted() {
      this.loadFiles();
    },
    methods: {
      loadFiles() {
        this.loading = true;
        this.error = false;

        this.axios.get('/api/files').then(response => {
          this.files = response.data;
        }).catch(error => {
          this.error = true;
          this.files = [];

          if (error.response) {
            console.log('Error! ' + error.response.data.message);
          } else {
            console.log('An error has occured while processing your request. We were unable to get more information.');
          }
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
          fileDownload(response.data, `${file.name}.zip`, 'application/zip');
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