<template>
  <div class="d-flex align-items-center justify-content-between gap-4">
    <h2 class="mb-0">File details</h2>
    <router-link :to="{name: (auth.authenticated ? 'userDashboard' : 'fileList')}" class="btn btn-outline-secondary">
      <i class="bi bi-arrow-90deg-left me-2"></i>Back
    </router-link>
  </div>
  <hr class="mb-5">

  <div class="text-center mt-6" v-if="loading">
    <img :src="require('@/assets/images/preloader.svg')" alt="Loading...">
  </div>
  <div v-else>
    <div class="card shadow max-w-1 p-4 mx-auto my-5" v-if="('name' in file)">
      <div class="card-body">
        <h3 class="mb-4 pb-1">{{ `${file.name}.${file.ext}` }}</h3>

        <p><strong>Uploaded by:</strong> {{ file.owner.name }}</p>
        <p><strong>Upload date:</strong> {{ file.created_at }}</p>
        <p><strong>File size:</strong> ###.## KB</p>
        <p>
          <strong>Status:</strong>&nbsp;
          <span :class="{ 'text-success': file.compressed, 'text-warning': !file.compressed }">
            {{ file.compressed ? 'Compressed (ready to download)' : 'Undergoing compression' }}
          </span>
        </p>

        <div class="action-buttons d-flex justify-content-between mt-4" v-if="auth.authenticated">
          <button class="btn p-0 fs-4" :class="{ 'opacity-25': !file.compressed }" :disabled="!file.compressed" @click="downloadFile"><i class="bi bi-download"></i></button>
          <router-link :to="{name: 'fileEdit', params: {id: file.id}}" class="btn p-0 fs-5"><i class="bi bi-pencil-square"></i></router-link>
          <button class="btn p-0 fs-4" @click="deleteFile"><i class="bi bi-x-square-fill text-danger"></i></button>
        </div>
        <div class="text-center mt-4" v-else>
          <button class="btn btn-primary w-100" :class="{ 'opacity-25': !file.compressed }" :disabled="!file.compressed" @click="downloadFile">
            <i class="bi bi-download me-2"></i>Download
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger d-flex align-items-center max-w-2 mx-auto" role="alert">
        <i class="bi bi-exclamation-triangle-fill fs-3 me-3"></i>
        <div>Sorry. We were unable to load the file.</div>
      </div>
    </div>
  </div>

  <ToastWidget>Your file is downloading...</ToastWidget>
</template>

<script>
  import { auth } from '../../store/auth';
  import { Toast } from 'bootstrap';

  export default {
    name: 'FileShow',
    data() {
      return {
        auth,
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
          const { id, name, ext, mime, compressed, owner, created_at } = response.data;

          const uploadDate = new Date(created_at);

          this.file.id         = id;
          this.file.name       = name;
          this.file.ext        = ext;
          this.file.mime       = mime;
          this.file.compressed = compressed;
          this.file.owner      = owner;
          this.file.created_at = (uploadDate.toLocaleString('default', {month: 'long'})) + ' ' + uploadDate.getDate() + ', ' + uploadDate.getFullYear();
        }).catch(error => {
          if (error.response) {
            alert('Error! ' + error.response.data.message);
          } else {
            alert('An error has occured while processing your request.');
          }
        }).finally(() => {this.loading = false});
      },

      downloadFile() {
        // This library works as a helper for JS downloads, since this is not a straight forward process.
        const fileDownload = require('js-file-download');

        this.axios({
          url: `/api/files/download/${this.$route.params.id}`,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          fileDownload(response.data, `${this.file.name}.zip`, 'application/zip');
          (new Toast(document.getElementById('live-toast'))).show();
        }).catch(error => {
          if (error.response) {
            alert('Error! ' + error.response.data.message);
          } else {
            alert('An error has occured while processing your request.');
          }
        });
      },

      deleteFile() {
        if (confirm('Are you sure you want to delete this file?')) {
          this.axios.delete(`/api/files/${this.$route.params.id}`).then(() => {
            this.$router.push({name: (auth.authenticated ? 'userDashboard' : 'fileList')});
          }).catch(error => {
            if (error.response) {
              alert('Error! ' + error.response.data.message + ':\n\n' + error.response.data.errors[0]);
            } else {
              alert('An error has occured while processing your request.');
            }
          });
        }
      },
    },
  }
</script>

<style scoped>
  .action-buttons .btn {
    opacity: 0.7;
    transition: 0.2s opacity;
  }

  .action-buttons .btn:hover {
    opacity: 1;
  }

  .action-buttons .btn:focus {
    box-shadow: none !important;
  }
</style>