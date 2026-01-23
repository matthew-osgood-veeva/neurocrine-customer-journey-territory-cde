<template>
	<div
		v-show="visible"
		:class="isStack ? '' : 'position-fixed top-0 start-50 translate-middle-x p-2'"
		:style="isStack ? '' : 'z-index: 1055'"
	>
		<div
			class="toast show align-items-center text-white border-0"
			role="status"
			:class="toastClass"
		>
			<div class="d-flex">
				<div class="toast-body d-flex align-items-center gap-2">
					<FontAwesomeIcon :icon="toastIcon" />
					<span class="flex-grow-1 overflow-hidden text-break">{{ props.message }}</span>
				</div>
				<button
					type="button"
					class="btn-close btn-close-white me-2 m-auto"
					aria-label="Close"
					@click="closeToast"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faCheck,
	faExclamationTriangle,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
	show: { type: Boolean, required: true },
	message: { type: String, required: true },
	variant: { type: String, default: "info" }, // error, warning, success, info
	autoClose: { type: Boolean, default: true },
	duration: { type: Number, default: 3000 },
	isStack: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const visible = ref(props.show);
let timeoutId = null;

const toastIcon = computed(() => {
	switch (props.variant) {
		case "error":
		case "warning":
			return faExclamationTriangle;
		case "success":
			return faCheck;
		default:
			return faInfoCircle;
	}
});

const toastClass = computed(() => {
	return {
		'bg-danger': props.variant === 'error',
		'bg-warning': props.variant === 'warning',
		'bg-success': props.variant === 'success',
		'bg-primary': !['error', 'warning', 'success'].includes(props.variant),
	};
});

onMounted(() => {
	if (props.show) {
		visible.value = true;

		if (props.autoClose) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				closeToast();
			}, props.duration);
		}
	}
});

watch(
  () => [props.show, props.message, props.autoClose, props.duration],
  ([show]) => {
    visible.value = show;

    if (show && props.autoClose) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        closeToast();
      }, props.duration);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
	clearTimeout(timeoutId);
});

function closeToast() {
	clearTimeout(timeoutId);
	emit("close");
}
</script>
