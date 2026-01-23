<template>
	<div class="search-box" :style="{ width: width }">
		<div
			class="d-flex align-items-center search-input-wrapper"
			:class="searchInputClasses"
		>
			<FontAwesomeIcon
				:icon="faSearch"
				size="sm"
				style="padding-left: 0.5rem"
				color="var(--xp-filter-icon-default)"
			/>
			<input
				ref="inputRef"
				v-if="!selectedOption"
				type="text"
				class="form-control search-input"
				:placeholder="placeholder"
				:value="searchTerm"
				v-model="searchTerm"
				@focus="handleFocus"
				@blur="handleBlur"
			/>
			<div v-else class="form-control">
				<span class="selected-option">{{ selectedOption.display }}</span>
			</div>
			<FontAwesomeIcon
				v-show="searchTerm || selectedOption"
				class="clear-icon"
				:icon="faXmarkCircle"
				style="cursor: pointer; padding-right: 0.5rem"
				color="var(--xp-filter-icon-default)"
				@pointerdown.stop.prevent="handleClearClick"
			/>
		</div>
	</div>
</template>

<script setup>
import { defineModel, ref, computed, defineExpose, nextTick } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

defineProps({
	placeholder: {
		type: String,
		default: "Search...",
	},
	width: {
		type: String,
		default: "100%",
	},
});

const searchTerm = defineModel("searchTerm");
const selectedOption = defineModel("selectedOption");

const emits = defineEmits(["focus", "blur"]);

const isFocused = ref(false);
const inputRef = ref(null);

const handleFocus = () => {
	isFocused.value = true;
	emits("focus");
};

const handleBlur = () => {
  setTimeout(() => {
		isFocused.value = false;
	}, 150);
	emits("blur");
};

const handleClearClick = async () => {
  emits('update:searchTerm', '');
  emits('update:selectedOption', '');
  await nextTick();
  inputRef.value?.focus();
}

defineExpose({
	focus: () => inputRef.value?.focus(),
});

const searchInputClasses = computed(() => ({
	"search-input-wrapper--focused": isFocused.value,
}));
</script>

<style scoped>
.search-box {
	height: var(--xp-filter-height);
}
input.form-control.search-input:focus {
	border: 0;
	box-shadow: none;
}
input.form-control.search-input {
	border: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 30px;
	font-size: 12px;
	color: var(--veeva-coal);
	padding-right: 1.75rem;
}
.search-input-wrapper {
	border: 1px solid var(--xp-border-gray);
	border-radius: 0.25rem;
	height: inherit;
	position: relative;
}
.search-input-wrapper--focused {
	border-color: var(--veeva-orange-500-base);
	box-shadow: 0 0 0 0.05rem var(--veeva-orange-500-base);
}
div.form-control {
	border: 0;
  height: 30px;
	display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  flex: 1;
  cursor: default;
	padding-right: 1.5rem;
}
.selected-option {
	border: 1px solid var(--xp-border-gray);
	border-radius: 0.25rem;
	padding: 0.2rem 0.5rem;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
	line-height: 1.5;
	font-size: 12px;
}
input.form-control.search-input::placeholder {
  color: var(--veeva-smoke);
}
.clear-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

</style>
