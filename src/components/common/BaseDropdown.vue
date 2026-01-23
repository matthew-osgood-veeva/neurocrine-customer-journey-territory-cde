<template>
	<div class="main-container" ref="dropdown" :style="{ width: width }">
    <div v-if="searchable && showDropdown">
      <BaseSearch
        :ref="(el) => { setAnchorRef(el); setSearchRef(el); }"
        @focus="showDropdown = true"
        @blur="handleBlur"
        v-model:searchTerm="searchTerm"
        v-model:selectedOption="selectedOption"
        width="100%"
				:placeholder="searchPlaceholder"
			/>
    </div>
		<div
      v-else
			class="select-bar"
			:ref="setAnchorRef"
			@click="showDropdown = !showDropdown"
			:style="dropdownListMaxHeight"
			tabindex="0"
		>
			<div class="selected-option-container" v-if="selectedOption">
				<span class="selected-option">
					{{ selectedOption.display }}
				</span>
			</div>
			<div class="placeholder-text" v-else>
				{{ placeholder }}
			</div>
			<div class="d-flex gap-2 align-items-center">
				<div
					v-if="clearable"
					style="
						width: 1rem;
						display: flex;
						align-items: center;
						justify-content: center;
					"
				>
					<FontAwesomeIcon
						v-show="selectedOption"
						:icon="faXmarkCircle"
						color="var(--xp-filter-icon-default)"
						class="icon-button"
						@click.stop="handleClearClick"
					/>
				</div>
				<div>
					<FontAwesomeIcon
						:icon="faChevronDown"
						color="var(--xp-filter-icon-default)"
					/>
				</div>
			</div>
		</div>
		<div
			v-if="showDropdown"
			class="dropdown-container"
			:class="dropdownPositionClass"
		>
			<ul class="list-group dropdown-list">
				<span v-if="options.length">
					<li
						v-for="option in options"
						:key="option.value"
						class="list-group-item d-flex gap-2 align-items-center"
						@mousedown.prevent="handleOptionClick(option)"
					>
						<span
							v-if="icon || option.icon && !useImageIcons"
							style="
								border-radius: 0.375rem;
								padding: 0.2rem;
								display: inline-flex;
								align-items: center;
								justify-content: center;
								width: 1.5rem;
								height: 1.5rem;
							"
							:style="`background-color: ${
								option.iconBackgroundColor || 'white'
							};`"
						>
							<FontAwesomeIcon
								:icon="option.icon || icon"
								:color="option.iconColor || iconColor"
								:size="iconSize"
								:fixedWidth="true"
							/>
						</span>
						<span v-else-if="icon || option.icon && useImageIcons">
							<img
								:src="option.icon"
								alt="icon"
								style="width: 1.5rem; height: 1.5rem"
							/>
						</span>
						<div class="d-flex flex-column">
							<div
								class="d-flex gap-2 align-items-center justify-content-between main-value"
							>
								<div>{{ option.display }}</div>
							</div>
							<div
								v-if="option.identifiers"
								class="d-flex flex-column"
							>
								<span
									v-for="identifierKey of Object.keys(
										option.identifiers || {}
									)"
									:key="identifierKey"
									class="identifier-value"
								>
									{{ option.identifiers[identifierKey] }}
								</span>
							</div>
						</div>
						<div
							style="
								width: 2rem;
								display: flex;
								align-items: center;
								justify-content: center;
							"
							class="ms-auto"
						>
							<FontAwesomeIcon
								v-show="
									selectedOption && selectedOption.value === option.value
								"
								:icon="faCheck"
								color="var(--veeva-green)"
								size="lg"
							/>
						</div>
					</li>
				</span>
				<li v-else class="list-group-item no-records-value">
					{{ noRecordsDisplay }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	defineProps,
	defineModel,
	computed,
	onMounted,
	onBeforeUnmount,
	watch,
	nextTick,
} from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faChevronDown,
	faXmarkCircle,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import BaseSearch from "./BaseSearch.vue";

const searchTerm = defineModel("searchTerm");
const selectedOption = defineModel("selectedOption");

const showDropdown = ref(false);
const dropdown = ref(null);
const anchorEl = ref(null);  
const searchComp = ref(null);

const setSearchRef = (el) => { searchComp.value = el ?? null; };

const setAnchorRef = (el) => {
  // Works for both: DOM node or component instance
  anchorEl.value = el?.$el ?? el ?? null;
};

const props = defineProps({
	placeholder: {
		type: String,
		default: "Please select",
	},
	icon: {
		default: null,
	},
	iconColor: {
		default: "#B0B0B7",
	},
	iconSize: {
		default: "2xl",
	},
	options: {
		type: Array,
		default: () => [],
	},
	noRecordsDisplay: {
		type: String,
		default: "No records found",
	},
	selectedOptionsDisplay: {
		type: String,
		default: "selected",
	},
	useImageIcons: {
		type: Boolean,
		default: false,
	},
	width: {
		type: String,
		default: "100%",
	},
  searchable: {
    type: Boolean,
    default: false,
  },
	clearable: {
		type: Boolean,
		default: true,
	},
	searchPlaceholder: {
		type: String,
		default: 'Search...'
	}
});

const handleOptionClick = (option) => {
	selectedOption.value = option;
	showDropdown.value = false;
};

const handleClearClick = () => {
	selectedOption.value = null;
};

const dropdownListMaxHeight = computed(() => ({
	"max-height": props.dropdownMaxHeight,
}));

const dropdownPositionClass = ref("");

const onGlobalPointerDown = (e) => {
  const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
  // If the click didn't occur inside this component's root container, close it
  const clickedInside = dropdown.value && path.includes(dropdown.value);
  if (!clickedInside) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('pointerdown', onGlobalPointerDown, { capture: true });
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onGlobalPointerDown, { capture: true });
});

watch(showDropdown, async (val) => {
	if (val) {
		await nextTick();
		const dropdownEl = dropdown.value?.querySelector(".dropdown-container");
		const padding = 16;

		if (dropdownEl && anchorEl.value) {
			const anchorRect = anchorEl.value.getBoundingClientRect();
			const dropdownWidth = dropdownEl.offsetWidth;
			
			// Check if dropdown would overflow on the right when centered
			const centerLeft = anchorRect.left + (anchorRect.width / 2) - (dropdownWidth / 2);
			const centerRight = centerLeft + dropdownWidth;
			
			if (centerRight > window.innerWidth - padding) {
				dropdownPositionClass.value = "align-right";
			} else if (centerLeft >= padding) {
				dropdownPositionClass.value = "align-center";
			} else {
				dropdownPositionClass.value = "align-left";
			}
		}
	}

	// Focus the search input when dropdown opens
		searchComp.value?.focus?.() ||
      searchComp.value?.$el?.querySelector?.('input')?.focus();
});
</script>

<style scoped>
.main-container {
	position: relative;
}
.select-bar {
	height: 32px;
	border: 1px solid var(--xp-border-gray);
	border-radius: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	gap: 5px;
}
.select-bar:focus {
	border-color: var(--veeva-orange);
	box-shadow: 0 0 0 0.05rem var(--veeva-orange);
}
.dropdown-container {
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	min-width: 100%;
	max-width: 600px;
	width: max-content;
	z-index: 10;
	background: white;
	border: 0.5px solid var(--xp-border-gray);
	display: flex;
	flex-direction: column;
	margin-top: 0.25rem;
	border-radius: 0.25rem;
}
.dropdown-list {
	overflow-y: auto;
	max-height: 250px;
	margin: 0;
	padding: 0;
	list-style: none;
}

.list-group-item {
	cursor: pointer;
	padding: 7px;
}

.list-group-item:hover {
	background-color: rgba(254, 172, 49, 0.1);
}

.main-value {
	font-size: 0.75rem;
}

.identifier-value {
	font-size: 0.75rem;
	color: rgb(138, 138, 138);
}

.no-records-value {
	font-size: 0.8rem;
	font-style: italic;
	color: rgb(138, 138, 138);
}

.selected-option-container {
	font-size: 0.8rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
}
.selected-option {
	border: 1px solid rgb(228, 228, 228);
	border-radius: 0.25rem;
	padding: 0.2rem 0.5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5;
	color: var(--Extended-Coal);
	display: inline-block;
}
.placeholder-text {
	font-size: 12px;
	color: var(--Extended-Smoke);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.icon-container {
	width: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
}
.icon-button {
	cursor: pointer;
	/* height: 20px; */
	/* width: 20px; */
}
.icon-button:hover {
	color: #878789;
}
.icon-button:active {
	opacity: 0.5;
}
.dropdown-container.align-left {
	left: 0;
	transform: none;
}
.dropdown-container.align-right {
	right: 0;
	left: auto;
	transform: none;
}
.dropdown-container.align-center {
	left: 50%;
	transform: translateX(-50%);
}
</style>
