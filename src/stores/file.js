import { defineStore } from 'pinia';
import { useAppStore } from '../stores/app';

export const useFileStore = defineStore('file', {
  state: () => ({
    files: [],
    file: {},
    loading: false,
    error: null,
  }),

  actions: {
    loadFiles() {
      this.files = [];
      this.loading = true;
      this.error = null;

      window.axios.get('/api/files').then(response => {
        this.files = response.data;
      }).catch(error => {
        this.error = error;
      }).finally(() => {this.loading = false});
    },

    loadUserFiles() {
      this.files = [];
      this.loading = true;
      this.error = null;

      window.axios.get('/api/user/files').then(response => {
        this.files = response.data;
      }).catch(error => {
        this.error = error;
      }).finally(() => {this.loading = false});
    },

    loadFile(id) {
      this.file = {};
      this.loading = true;
      this.error = null;

      window.axios.get(`/api/files/${id}`).then(response => {
        const { id, name, ext, compressed, size, owner, created_at } = response.data;

        // Improved rounding function
        function round(value) {
          const m = Number((Math.abs(value) * 100).toPrecision(15));
          return Math.round(m) / 100 * Math.sign(value);
        }

        const uploadDate = new Date(created_at);

        this.file.id         = id;
        this.file.name       = name;
        this.file.ext        = ext;
        this.file.compressed = compressed;
        this.file.size       = round(size / 1048576); // Convert from Bytes to MB
        this.file.created_at = (uploadDate.toLocaleString('default', {month: 'long'})) + ' ' + uploadDate.getDate() + ', ' + uploadDate.getFullYear();
        this.file.owner      = owner;
      }).catch(error => {
        this.error = error;
      }).finally(() => {this.loading = false});
    },

    downloadFile(file) {
      const { showInfo, showError } = useAppStore();

      // This library works as a helper for JS downloads, since this is not a straight forward process.
      const fileDownload = require('js-file-download');

      window.axios({
        url: `/api/files/download/${file.id}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        fileDownload(response.data, `${file.name}.zip`, 'application/zip');
        showInfo('Your file is downloading...');
      }).catch(error => {
        showError(error);
      });
    },

    deleteFile(id, confirm = true) {
      const { showInfo, showError } = useAppStore();
      let greenLight = true;

      if (confirm) {
        greenLight = window.confirm('Are you sure you want to delete this file?');
      }

      if (greenLight) {
        window.axios.delete(`/api/files/${id}`).catch(error => {
          showError(error);
        });

        showInfo('Deleting file...');
      }
    },
  },
});
