<template>
  <div
    class="toast-container position-fixed start-50 translate-middle-x d-flex flex-column align-items-center gap-2 pt-2"
    style="top: 0; z-index: 1055;"
  >
    <BaseToast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :variant="toast.variant"
      :autoClose="toast.autoClose"
      :duration="toast.duration"
      :show="true"
      :isStack="true"
      @close="() => removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
import BaseToast from '@/components/common/BaseToast.vue';

defineProps({
  toasts: {
    type: Array,
    required: true,
  },
  removeToast: {
    type: Function,
    required: true,
  },
});
</script>
