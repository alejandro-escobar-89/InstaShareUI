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
        <div class="form-text">Max. file size: 50 MB</div>
      </div>

      <div class="text-end">
        <button type="submit" class="btn btn-primary mb-3"><i class="bi bi-upload me-2"></i>Upload</button>
      </div>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAppStore } from '../../stores/app';

  const router = useRouter();
  const content = ref(null);
  const { showInfo, showError } = useAppStore();

  let file = {
    name: '',
    content: null,
  };

  const updateContent = () => {
    file.content = content.value.files[0];
  };

  const upload = () => {
    // Preparing the payload to be sent with the request
    const headers = { 'Content-Type': 'multipart/form-data' };
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('content', file.content);

    window.axios.post('/files', formData, { headers }).catch(error => {
      showError(error);
    });

    showInfo('Uploading file...');
    router.push({name: 'userDashboard'});
  };
</script>
