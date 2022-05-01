<template>
  <h2 class="mb-0">Files shared by the community</h2>
  <hr class="mb-3">

  <div class="text-center mt-6 pt-5" v-if="loading">
    <img :src="require('@/assets/images/preloader.svg')" alt="Loading...">
    <h2>Please, wait...</h2>
  </div>
  <div v-else>
    <div class="alert alert-danger d-flex align-items-center max-w-2 mx-auto mt-5" role="alert" v-if="error">
      <i class="bi bi-exclamation-triangle-fill fs-3 me-3"></i>
      <div>
        <p class="mb-1">Sorry. We were unable to load the file list.</p>
        <p class="mb-1" v-if="error.message"><strong>Description:</strong> {{ error.message }}.</p>
      </div>
    </div>
    <div v-else>
      <div v-if="files.length > 0">
        <p class="mb-4-5 text-end small text-muted">
          The <i class="bi bi-check-circle-fill text-success fs-6"></i> icon means the file is compressed and ready to download, as opposed to the <i class="bi bi-exclamation-circle-fill text-warning fs-6"></i> icon.
        </p>

        <div class="d-flex flex-wrap gap-5 justify-content-start file-container">
          <div class="file-wrapper" v-for="file in files" :key="file.id">
            <div class="card shadow position-relative">
              <i v-if="file.compressed" class="bi bi-check-circle-fill text-success fs-4 position-absolute top-0 start-0 translate-middle"></i>
              <i v-else class="bi bi-exclamation-circle-fill text-warning fs-4 position-absolute top-0 start-0 translate-middle"></i>

              <router-link
                  :to="{name: 'fileShow', params: {id: file.id}}"
                  class="card-body overflow-hidden d-flex justify-content-center align-items-center"
              >
                <span class="fs-1 fw-bold text-uppercase text-break text-center lh-1">.{{ file.ext }}</span>
              </router-link>

              <div class="card-footer fs-5 d-flex justify-content-between">
                <button class="btn btn-sm btn-primary w-100" :class="{ 'opacity-25': !file.compressed }" :disabled="!file.compressed" @click="downloadFile(file)">
                  <i class="bi bi-download me-2"></i>Download
                </button>
              </div>
            </div>

            <p class="text-center small p-2 pb-0 file-name">{{ file.name }}</p>
          </div>
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
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useFileStore } from '../../stores/file';

  const { files, loading, error } = storeToRefs(useFileStore());
  const { loadFiles, downloadFile } = useFileStore();

  loadFiles();
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
    opacity: 0.75;
    transition: 0.2s opacity;
  }

  .card .card-footer button:hover {
    opacity: 1;
  }
</style>