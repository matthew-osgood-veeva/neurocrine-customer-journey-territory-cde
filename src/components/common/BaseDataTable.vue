<template>
	<div :class="themeClass">
		<div class="table_container" :style="tableContainerStyle">
			<div class="table_scroller">
				<table class="table table-hover" :class="tableClasses">
					<thead>
						<tr>
							<th
								v-for="column in columns"
								:key="column.key"
								scope="col"
								class="align-middle"
								@click="
									column?.isSortable
										? sortBy(column.key)
										: null
								"
								:style="{ width: column?.width || 'auto' }"
							>
								<span class="d-flex gap-2">
									<span>{{ column?.label || "" }}</span>
									<span v-if="column?.isSortable">
										<span class="sort-icon">
											<FontAwesomeIcon
												v-if="
													sortColumnKey === column.key
												"
												:icon="
													sortDirection === 1
														? faSortUp
														: faSortDown
												"
												color="#B0B0B7"
											/>
											<FontAwesomeIcon
												v-else
												:icon="faSort"
												color="#E4E4E7"
											/>
										</span>
									</span>
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<template
							v-for="(row, index) in isLoading
								? [null, null, null]
								: sortedRows"
							:key="index"
						>
							<tr>
								<td
									v-for="column in columns"
									:key="column.key"
									class="align-middle placeholder-glow"
								>
									<span
										v-if="isLoading"
										class="placeholder col-4"
									></span>
									<div
										v-else-if="row"
										:class="
											getRowContentClasses(
												row[column.key]
											)
										"
									>
										<span
											v-if="row[column.key]?.iconsStart"
											class="me-2 no-wrap"
										>
											<span
												v-for="(icon, iconIndex) of row[
													column.key
												].iconsStart"
												:key="icon.icon"
											>
												<span
													:class="
														iconIndex !== 0 &&
														'ms-2'
													"
												>
													<FontAwesomeIcon
														:icon="icon.icon"
														:color="
															icon.color ??
															'#808080'
														"
														:size="
															icon.size ?? 'sm'
														"
													/>
												</span>
											</span>
										</span>
										<span
											v-if="hasDeepLink(row[column.key])"
										>
											<a
												href="#"
												@click="
													viewRecord(
														row[column.key]
															.deepLinkObject,
														row[column.key]
															.deepLinkId
													)
												"
											>
												{{ row[column.key]?.display }}
											</a>
										</span>
										<span
											v-else-if="row[column.key]?.vhtml"
										>
											<div
												v-html="row[column.key]?.vhtml"
											></div>
										</span>
										<span
											v-else
											:style="{
												color: row[column.key]
													?.displayColor,
											}"
										>
											{{ row[column.key]?.display || "" }}
										</span>
										<span
											v-if="row[column.key]?.iconsEnd"
											class="ps-2 ms-auto no-wrap"
										>
											<span
												v-for="(icon, iconIndex) of row[
													column.key
												].iconsEnd"
												:key="icon.icon"
											>
												<!-- On a mobile device, @touchstart sets the button to an active state, allowing the opacity to apply -->
												<button
													v-if="icon.iconCallback"
													type="button"
													class="btn btn-icon p-0 border-0"
													:class="[
														row[column.key].iconsEnd
															.length -
															1 !==
															iconIndex && 'me-2',
													]"
													@click="
														onIconClick(
															icon.iconCallback,
															icon.iconCallbackArgs
														)
													"
													@touchstart="noop"
												>
													<FontAwesomeIcon
														:icon="icon.icon"
														:color="
															icon.color ??
															'#808080'
														"
														:size="
															icon.size ?? 'sm'
														"
													/>
												</button>
												<span
													v-else
													:class="
														row[column.key].iconsEnd
															.length -
															1 !==
															iconIndex && 'me-2'
													"
												>
													<FontAwesomeIcon
														:icon="icon.icon"
														:color="
															icon.color ??
															'#808080'
														"
														:size="
															icon.size ?? 'sm'
														"
													/>
												</span>
											</span>
										</span>
									</div>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faSortUp,
	faSortDown,
	faSort,
} from "@fortawesome/free-solid-svg-icons";
import { viewRecord } from "@/lib/myInsights/query";
import { useAppStore } from "@/store/modules/appStore";

const store = useAppStore();

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false,
	},
	striped: {
		type: Boolean,
		default: false,
	},
	columns: {
		type: Array,
		default: () => [],
	},
	rows: {
		type: Array,
		default: () => [],
	},
	defaultSortColumnKey: {
		type: String,
		default: null,
	},
	defaultSortColumnDirection: {
		type: Number,
		default: null,
	},
	maxHeight: {
		type: String,
		default: "100%",
	},
	maxWidth: {
		type: String,
		default: "100%",
	},
});

const sortColumnKey = ref(props.defaultSortColumnKey);
const sortDirection = ref(props.defaultSortColumnDirection || 1); // 1 for ascending, -1 for descending

const sortBy = (columnKey) => {
	if (sortColumnKey.value === columnKey) {
		sortDirection.value = -sortDirection.value;
	} else {
		sortColumnKey.value = columnKey;
		sortDirection.value = 1;
	}
};

const sortedRows = computed(() => {
	return [...props.rows].sort((a, b) => {
		let aValue = a[sortColumnKey.value]?.value ?? "";
		let bValue = b[sortColumnKey.value]?.value ?? "";

		const isDate = Date.parse(aValue) && Date.parse(bValue);

		if (isDate) {
			aValue = new Date(aValue);
			bValue = new Date(bValue);
		}
		return aValue > bValue
			? sortDirection.value
			: aValue < bValue
			? -sortDirection.value
			: 0;
	});
});

const emit = defineEmits(["iconClick"]);

const onIconClick = (iconCallback, iconCallbackArgs) => {
	emit("iconClick", iconCallback(iconCallbackArgs));
};

/* -------- HELPER METHODS -------- */

const hasDeepLink = (cell) => cell?.deepLinkObject && cell?.deepLinkId;

/* -------- STYLING -------- */

const tableContainerStyle = computed(() => ({
	"max-height": props.maxHeight,
	"max-width": props.maxWidth,
}));

const themeClass = computed(() => ({
	"online-theme": store.isOnline,
	"mobile-theme": !store.isOnline,
}));

const tableClasses = computed(() => ({
	"table-striped": props.striped,
	"table-custom": true,
}));

const getRowContentClasses = (cell) => {
	return {
		"d-flex": true,
		"align-items-center": true,
		"justify-content-start": cell?.alignContent === "start" ? true : false,
		"justify-content-center":
			cell?.alignContent === "center" ? true : false,
		"justify-content-end": cell?.alignContent === "end" ? true : false,
	};
};
</script>

<style scoped>
.table_container {
  overflow: auto;
  background: #fff;
}
.table_scroller {
  /* max-height: 480px; */
  overflow: auto;
}
.table_scroller table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
}

.theme-online table {
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	font-size: 12px;
	--bs-table-color: #212529;
}

.theme-mobile .table_container {
  border-radius: 0 var(--xp-card-border-radius) 0 var(--xp-card-border-radius);
}

.theme-mobile table {
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	font-size: 14px;
	--bs-table-color: #333333;
}

.theme-mobile thead th {
	color: var(--veeva-sapphire, #004c93);
	fill: var(--veeva-sapphire, #004c93);
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 860;
	line-height: normal;
	letter-spacing: -0.01rem;
	padding: 0 1rem;
}

.theme-mobile thead tr {
	height: 2.5rem;
	padding: 0 1rem;
	/* background: var(--Secondary-header-Ghost, #f2f6f9); */
}

.theme-mobile tbody td {
	height: 2.5rem;
	padding: 0 1rem;
	/* background: var(--Secondary-header-Ghost, #f2f6f9); */
}

.theme-mobile .table-hover tbody tr:hover {
	--bs-table-hover-bg: rgba(254, 172, 49, 0.1); /* Matches Vault CRM Tables */
}
thead th {
	cursor: pointer;
}
th {
	top: 0;
	z-index: 2;
	position: sticky;
	background-color: white;
}
.sort-icon .faSort {
	visibility: hidden;
	opacity: 0;
}
.sort-icon .visible-icon {
	visibility: visible !important;
	opacity: 1;
}
.hidden-icon {
	visibility: hidden;
	opacity: 0;
}
th:hover .hidden-icon {
	visibility: visible;
	opacity: 1;
	transition: opacity 0.4s ease;
}
a {
	color: #0176d3;
	text-decoration: none;
	-webkit-transition: color 0.1s linear;
	transition: color 0.1s linear;
}
a:hover,
a:focus {
	text-decoration: underline;
	color: #014486;
}
.no-wrap {
	display: flex;
	align-items: center;
	white-space: nowrap;
}
.btn-light {
	background-color: transparent;
}
.btn:active {
	opacity: 0.2;
}
.btn {
	transition: opacity 0.2s ease;
}
</style>
