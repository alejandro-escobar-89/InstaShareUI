<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand fs-3 d-flex align-items-center">
            <img :src="require('@/assets/images/logo.svg')" width="40" height="40" alt="Logo" class="d-inline-block me-3">
            <span class="d-none d-sm-inline-block">InstaShare UI</span>
        </span>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarToggler" aria-controls="navbarToggler"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarToggler" v-if="!processing">
          <ul class="navbar-nav align-items-md-center ms-auto my-2 my-md-0">
            <li class="nav-item" v-if="!authenticated">
              <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item" v-if="!authenticated">
              <router-link :to="{name: 'fileList'}" class="nav-link">Shared Files</router-link>
            </li>
            <li class="nav-item ms-md-2 mt-2 mt-md-0" v-if="!authenticated">
              <router-link :to="{name: 'register'}" class="btn btn-outline-primary">Sign up</router-link>
            </li>
            <li class="nav-item ms-md-3 mt-3 mt-md-0" v-if="!authenticated">
              <router-link :to="{name: 'login'}" class="btn btn-primary">Login</router-link>
            </li>
            <li class="nav-item" v-if="authenticated">
              <router-link :to="{name: 'userDashboard'}" class="nav-link">My Files</router-link>
            </li>
            <li class="nav-item ms-md-2 mt-2 mt-md-0" v-if="authenticated">
              <i class="bi bi-box-arrow-right fs-2 lh-1 nav-link" @click="logout"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <section id="content" class="container p-3 p-sm-5">
    <div class="text-center mt-6 pt-5" v-if="processing">
      <img :src="require('@/assets/images/preloader.svg')" alt="Loading...">
      <h2>Please, wait...</h2>
    </div>
    <router-view v-else></router-view>
  </section>

  <footer class="px-3 py-4 bg-dark text-light text-center">
    &copy; InstaShare UI - All rights reserved - {{ (new Date()).getFullYear() }}
  </footer>

  <!-- Toast Widgets -->
  <div class="toast-container">
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="info-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3500">
        <div class="toast-header border-bottom">
          <i class="bi bi-info-circle-fill text-info me-2"></i>
          <strong class="me-auto">Info</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-light p-3"></div>
      </div>
    </div>

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="error-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3500">
        <div class="toast-header border-bottom">
          <i class="bi bi-exclamation-circle-fill text-danger me-2"></i>
          <strong class="me-auto">Error</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-light p-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useUserStore } from './stores/user';
  import { useAppStore } from './stores/app';
  import { useFileStore } from './stores/file';

  const router = useRouter();
  const { authenticated } = storeToRefs(useUserStore());
  const { checkAuthenticated } = useUserStore();
  const { showError } = useAppStore();
  const fileStore = useFileStore();
  const processing = ref(true);

  // Ensure the channel and its listeners are registered only once
  window.Echo.channel('files').stopListening('.FileCreated').stopListening('.FileUpdated').stopListening('.FileDeleted');
  window.Echo.leave('files');

  window.Echo.channel('files')
    .listen('.FileCreated', ({file}) => {
      if (fileStore.files.find(f => f.id === file.id) === undefined) {
        fileStore.files.push(file);
      }
    })
    .listen('.FileUpdated', ({file}) => {
      const updatedFileIndex = fileStore.files.findIndex(f => f.id === file.id);

      if (updatedFileIndex !== -1) {
        fileStore.files.splice(updatedFileIndex, 1, file);
      }
    })
    .listen('.FileDeleted', ({file}) => {
      const deletedFileIndex = fileStore.files.findIndex(f => f.id === file.id);

      if (deletedFileIndex !== -1) {
        fileStore.files.splice(deletedFileIndex, 1);
      }
    });

  const logout = () => {
    window.axios.post('/logout').then(() => {
      checkAuthenticated(null, () => {
        router.push({name: 'home'});
      });
    }).catch(error => {
      showError(error);
    });
  };

  checkAuthenticated(() => {
    processing.value = false;
    router.push({name: 'userDashboard'});
  }, () => {
    processing.value = false;
    router.push({name: 'home'});
  });
</script>

<style scoped>
  .navbar .nav-item i {
    cursor: pointer;
  }

  .toast {
    border-color: rgba(0,0,0,.2) !important;
  }

  @media (max-width: 480px) {
    .toast {
      width: 250px !important;
    }
  }
</style>