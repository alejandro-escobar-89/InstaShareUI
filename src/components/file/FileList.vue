<template>
    <div v-if="files.length > 0">
        <p v-for="(file, key) in files" :key="key">{{ file.name }}</p>
    </div>
</template>

<script>
    export default {
        name: 'FileList',
        data() {
            return {
                files: [],
            }
        },
        mounted() {
            this.getFiles();
        },
        methods: {
            getFiles() {
                this.axios.get('/api/files').then(response => {
                    this.files = response.data;
                }).catch(error => {
                    console.log(error);
                    this.files = [];
                });
            },
        }
    }
</script>