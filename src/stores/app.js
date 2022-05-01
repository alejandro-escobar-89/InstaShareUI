import { defineStore } from 'pinia';
import { Toast } from 'bootstrap';

export const useAppStore = defineStore('app', {
  actions: {
    showInfo(msg) {
      document.querySelector('#info-toast .toast-body').innerText = msg;
      (new Toast(document.getElementById('info-toast'))).show();
    },

    showError(error) {
      let msg = 'Unable to process your request';

      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;

        if (error.response.data.errors && (typeof error.response.data === 'object')) {
          error.response.data.errors.map((value) => {
            msg += `\n\n- ${value}`;
          });
        }
      } else if (typeof error === 'object') {
        msg = error.toString().replace(/^Error:\s/, '');
      } else if (typeof error === 'string') {
        msg = error;
      }

      document.querySelector('#error-toast .toast-body').innerText = msg;

      (new Toast(document.getElementById('error-toast'))).show();
    },
  },
});
