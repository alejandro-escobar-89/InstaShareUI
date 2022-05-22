<template>
  <div class="d-flex align-items-center justify-content-between gap-4">
    <h2 class="mb-0">File details</h2>
    <router-link :to="{name: (authenticated ? 'userDashboard' : 'fileList')}" class="btn btn-outline-secondary">
      <i class="bi bi-arrow-90deg-left me-2"></i>Back
    </router-link>
  </div>
  <hr class="mb-5">

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
      <div class="card shadow max-w-1 p-4 mx-auto my-5" v-if="('name' in file)">
        <div class="card-body">
          <h3 class="mb-4 pb-1">{{ `${file.name}.${file.ext}` }}</h3>

          <p><strong>Uploaded by:</strong> {{ file.owner.name }}</p>
          <p><strong>Upload date:</strong> {{ file.created_at }}</p>
          <p><strong>File size:</strong> {{ file.size }} MB</p>
          <p>
            <strong>Status:</strong>&nbsp;
            <span :class="{ 'text-success': file.compressed, 'text-warning': !file.compressed }">
              {{ file.compressed ? 'Compressed (ready to download)' : 'Undergoing compression' }}
            </span>
          </p>

          <div class="action-buttons d-flex justify-content-between mt-4" v-if="authenticated">
            <button class="btn p-0 fs-4" :disabled="!file.compressed" @click="downloadFile(file)"><i class="bi bi-download"></i></button>
            <router-link :to="{name: 'fileEdit', params: {id: file.id}}" class="btn p-0 fs-5"><i class="bi bi-pencil-square"></i></router-link>
            <button class="btn p-0 fs-4" @click="deleteAndRedirect(file.id)"><i class="bi bi-x-square-fill text-danger"></i></button>
          </div>
          <div class="text-center mt-4" v-else>
            <button class="btn btn-primary w-100" :disabled="!file.compressed" @click="downloadFile(file)">
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
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '../../stores/auth';
  import { useFileStore } from "../../stores/file";

  const route = useRoute();
  const router = useRouter();
  const { authenticated } = storeToRefs(useAuthStore());
  const { file, loading, error } = storeToRefs(useFileStore());
  const { loadFile, downloadFile, deleteFile } = useFileStore();

  loadFile(route.params.id);

  const deleteAndRedirect = (id) => {
    if (confirm('Are you sure you want to delete this file?')) {
      deleteFile(id, false);
      router.push({name: 'userDashboard'});
    }
  }
</script>

<style scoped>
  .action-buttons .btn {
    opacity: 0.75;
    transition: 0.2s opacity;
  }

  .action-buttons .btn:hover {
    opacity: 1;
  }

  .action-buttons .btn:focus {
    box-shadow: none !important;
  }
</style>