<template>
  <div
    class="modal fade show"
    tabindex="-1"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    v-if="show"
    role="dialog"
    aria-modal="true"
    @click.self="onClose"
  >
    <div class="modal-dialog" :class="modalSizeClass">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="onClose" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="modal-content" />
        </div>
        <div class="modal-footer">
          <slot name="modal-footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
  size: {
    type: String,
    default: "md", // sm | md | lg | xl
  },
  type: {
    type: String,
    default: "default", // optional for styling
  },
  onClose: {
    type: Function,
    default: () => {},
  },
});

const modalSizeClass = {
  sm: "modal-sm",
  md: "",
  lg: "modal-lg",
  xl: "modal-xl",
}[props.size] || "";
</script>
