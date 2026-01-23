<template>
	<div class="btn-group" role="group" aria-label="Button Group">
		<button
			v-for="button in buttons"
			:key="button.value"
			type="button"
			class="btn xp-btn-group__button"
			:class="{ 'xp-btn-group__button--selected': button.value === modelValue }"
			@click="modelValue = button.value"
		>
			{{ button.label }}
		</button>
	</div>
</template>

<script setup>
import { defineModel } from "vue";

defineProps({
	buttons: {
		type: Array,
		required: true,
	},
});

const modelValue = defineModel();

</script>

<style scoped>
.btn-group {
  height: var(--xp-filter-height);
}
.xp-btn-group__button {
  color: var(--veeva-imperial-blue);
  border: 1px solid var(--veeva-mist);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
.xp-btn-group__button:hover {
  background-color: #00000022;
  opacity: 0.8;
  border: 1px solid var(--veeva-mist);
  color: var(--veeva-imperial-blue);
}
.xp-btn-group__button:active,
.xp-btn-group__button--selected,
.xp-btn-group__button--selected:hover {
  background-color: var(--veeva-imperial-blue);
  color: white;
}
</style>
