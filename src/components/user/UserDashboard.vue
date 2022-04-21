<template>
  <div v-if="files.length > 0">
    <p v-for="(file, key) in files" :key="key">{{ file.name }}</p>
  </div>
</template>

<script>
  export default {
    name: 'UserDashboard',
    data() {
      return {
        files: [],
      }
    },
    mounted() {
      this.getUserFiles();
    },
    methods: {
      getUserFiles() {
        this.axios.get('/api/files').then(response => {
          this.files = response.data;
        }).catch(() => {
          alert('An error has occured while proccessing your request.');
          this.files = [];
        });
      },
    }
  }
</script>