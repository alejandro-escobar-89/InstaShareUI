<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="live-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header border-bottom">
        <i class="bi me-2" :class="toastClass"></i>
        <strong class="me-auto">InstaShare UI</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>

      <div class="toast-body bg-light p-3"><slot /></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ToastWidget',
    props: {
      type: {
        validator(value) {
          return ['info', 'success', 'warning', 'error'].includes(value);
        },
        default: 'info',
      },
      msg: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        toastClass: {
          'bi-info-circle-fill text-info': this.type === 'info',
          'bi-check-circle-fill text-success': this.type === 'success',
          'bi-exclamation-triangle-fill text-warning': this.type === 'warning',
          'bi-exclamation-circle-fill text-danger': this.type === 'error',
        }
      }
    },
  }
</script>

<style scoped>
  .toast {
    border-color: rgba(0,0,0,.2) !important;
  }

  @media (max-width: 480px) {
    .toast {
      width: 250px !important;
    }
  }
</style>