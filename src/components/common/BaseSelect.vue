<template>
  <div>
    <label v-if="showLabel && label" :for="id" class="form-label mb-0">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="select-wrapper">
      <select
        :id="id"
        class="form-select"
        :class="{ 'placeholder-active': !model || model === '' }"
        v-model="model"
        :aria-label="label || 'Select input'"
        :disabled="options.length === 0"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.display }}
        </option>
      </select>

      <FontAwesomeIcon
        :icon="faChevronDown"
        class="select-icon icon-button"
        color="var(--xp-filter-icon-default)"
      />

      <button
        v-if="model && model !== ''"
        type="button"
        class="clear-button"
        @click="clearSelection"
        :aria-label="`Clear ${label || 'selection'}`"
      >
        <FontAwesomeIcon
          :icon="faXmarkCircle"
          class="clear-icon icon-button"
          color="var(--xp-filter-icon-default)"
        />
      </button>
    </div>

    <div v-if="error" class="invalid-feedback d-block">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { defineModel, onMounted } from 'vue';

const model = defineModel()

const props = defineProps({
  label: String,
  showLabel: { type: Boolean, default: true },
  options: { type: Array, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Please select' },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: 'This field is required.' },
  width: { type: String, default: '100%' },
})

const id = props.label?.toLowerCase().replace(/\s+/g, '-') || 'select-field'

// Initialize with empty string to show placeholder
onMounted(() => {
  if (!model.value) {
    model.value = ''
  }
})

const clearSelection = () => {
  model.value = ''
}
</script>

<style scoped>
.select-wrapper {
  position: relative;
  display: inline-block;
  width: v-bind(width);
}

.form-select {
  height: 32px;
  border: 1px solid var(--xp-border-gray);
  border-radius: 0.25rem;
  padding: 0 3.4rem 0 10px; /* extra right padding so text doesn't overlap icon */
  background-color: white;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* hide native arrow */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  --bs-form-select-bg-img: none;
  background-image: none !important;
}

.form-select:focus {
  border-color: var(--veeva-orange-500-base);
  box-shadow: 0 0 0 0.05rem var(--veeva-orange-500-base);
}

.form-select.placeholder-active {
  color: var(--veeva-smoke);
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.clear-button {
  position: absolute;
  right: 2.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-icon {
  cursor: pointer;
}

.icon-button {
  cursor: pointer;
}

.icon-button:hover {
  color: #878789;
}

.icon-button:active {
  opacity: 0.5;
}
.form-label {
  font-size: 12px;
}
</style>
