<template>
  <div class="d-flex align-items-center justify-content-between gap-4">
    <h2 class="mb-0">My shared files</h2>
    <router-link :to="{name: 'fileCreate'}" class="btn btn-primary">
      <i class="bi bi-upload me-2"></i>Upload file
    </router-link>
  </div>
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

        <div class="d-flex flex-wrap gap-5 justify-content-center justify-content-sm-start file-container">
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

              <div class="card-footer d-flex justify-content-between">
                <button class="btn p-0 fs-5" :disabled="!file.compressed" @click="downloadFile(file)"><i class="bi bi-download"></i></button>
                <router-link :to="{name: 'fileEdit', params: {id: file.id}}" class="btn p-0 fs-5"><i class="bi bi-pencil-square"></i></router-link>
                <button class="btn p-0 fs-5" @click="deleteFile(file.id)"><i class="bi bi-x-square-fill text-danger"></i></button>
              </div>
            </div>

            <p class="text-center small p-2 pb-0 file-name">{{ file.name }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center mt-5">You haven't uploaded any files yet. Give it a try!</p>

        <div class="text-center mt-4">
          <router-link :to="{name: 'fileCreate'}" class="btn btn-primary">
            <i class="bi bi-upload me-2"></i>Upload file
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useFileStore } from '../../stores/file';

  const { files, loading, error } = storeToRefs(useFileStore());
  const { loadUserFiles, downloadFile, deleteFile } = useFileStore();

  loadUserFiles();
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

  .card .card-footer .btn {
    opacity: 0.75;
    transition: 0.2s opacity;
  }

  .card .card-footer .btn:hover {
    opacity: 1;
  }

  .card .card-footer .btn:focus {
    box-shadow: none !important;
  }
</style>