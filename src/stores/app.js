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

      try {
        if (error.response && error.response.data && error.response.data.message) {
          msg = error.response.data.message;

          if (error.response.data.errors) {
            const errors = error.response.data.errors;

            if (Array.isArray(errors)) {
              errors.map((error) => {
                msg += `\n\n- ${error}`;
              });
            } else if (typeof errors === 'object') {
              for (const error in errors) {
                msg += '\n\n- ' + errors[error];
              }
            }
          }
        } else if (typeof error === 'object') {
          msg = error.toString().replace(/^Error:\s/, '');
        } else if (typeof error === 'string') {
          msg = error;
        }
      } catch (e) {
        msg += '\nPlease check the logs for more info.';
      }

      document.querySelector('#error-toast .toast-body').innerText = msg;

      (new Toast(document.getElementById('error-toast'))).show();
    },
  },
});
