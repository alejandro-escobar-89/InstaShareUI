<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand fs-3 d-flex align-items-center">
            <img src="favicon.svg" width="40" height="40" alt="InstaShare logo" class="d-inline-block me-3">
            <span class="d-none d-sm-inline-block">InstaShare UI</span>
        </span>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarToggler" aria-controls="navbarToggler"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav align-items-md-center ms-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'userDashboard'}" class="nav-link">My Files</router-link>
            </li><li class="nav-item">
            <router-link :to="{name: 'fileList'}" class="nav-link">Shared Files</router-link>
          </li>
            <li class="nav-item ms-md-2 mt-2 mt-md-0">
              <router-link :to="{name: 'login'}" class="btn btn-primary">Login</router-link>
            </li>
            <li class="nav-item ms-md-2 mt-2 mt-md-0">
              <i class="bi bi-box-arrow-right fs-2 nav-link" @click="logout"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <section id="content" class="container p-3 p-sm-5">
    <router-view></router-view>
  </section>

  <footer class="px-3 py-4 bg-dark text-light text-center">
    &copy; InstaShare UI - All rights reserved - {{ (new Date()).getFullYear() }}
  </footer>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      logout() {
        this.axios.post('/logout').then(() => {
          this.$router.push({name: 'home'});
        }).catch(() => {
          alert('An error has occured while proccessing your request.');
        });
      }
    }
  }
</script>

<style scoped>
  .navbar .nav-item i {
    cursor: pointer;
  }
</style>