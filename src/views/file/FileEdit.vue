<template>
  <div class="d-flex align-items-center justify-content-between gap-4">
    <h2 class="mb-0">Edit file's metadata</h2>
    <button class="btn btn-outline-secondary" @click="router.back()"><i class="bi bi-arrow-90deg-left me-2"></i>Back</button>
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
      <form @submit.prevent="update" class="card rounded-3 shadow-lg my-5 max-w-2 mx-auto">
        <div class="card-body p-4 px-sm-5">
          <h3 class="text-primary text-center mt-3 mb-5">Edit this file's name</h3>

          <div class="mb-4">
            <label for="name" class="form-label">File name</label>
            <input type="text" id="name" name="name" class="form-control" required v-model.trim="file.name">
          </div>

          <div class="text-end">
            <button type="submit" class="btn btn-primary mb-3"><i class="bi bi-pencil-square me-2"></i>Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAppStore } from '../../stores/app';
  import { useFileStore } from "../../stores/file";

  const route = useRoute();
  const router = useRouter();
  const { showInfo, showError } = useAppStore();
  const { file, loading, error } = storeToRefs(useFileStore());
  const { loadFile } = useFileStore();

  const update = () => {
    window.axios.put(`/files/${route.params.id}`, {name: file.value.name}).catch(error => {
      showError(error);
    });

    showInfo('Updating file...');
    router.back();
  };

  loadFile(route.params.id);
</script>
