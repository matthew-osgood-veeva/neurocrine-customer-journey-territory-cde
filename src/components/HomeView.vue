<template>
  <div class="px-3 pt-3">
    <div class="d-flex justify-content-between align-items-end mb-3">
      
      <h3 class="m-0">HCP List ({{ totalHCPs }})</h3>

      <div class="d-flex align-items-end gap-3">
        
        <div class="d-flex flex-column">
           <label class="form-label fw-bold mb-1 text-secondary" style="font-size: 12px;">
              Search
           </label>
           <BaseSearch
             v-model:searchTerm="searchTerm"
             placeholder="Search Account Name..."
             width="220px"
           />
        </div>

        <div class="d-flex flex-column">
            <label class="form-label fw-bold mb-1 text-secondary" style="font-size: 12px;">
                Customer Journey Stage
            </label>
            <BaseSelect
              v-model="selectedStage"
              :options="stageOptions"
              width="220px"
              placeholder="All Stages"
              :show-label="false" 
            />
        </div>
      </div>
    </div>
  </div>

  <div class="px-3 journey-table-container" style="height: calc(100vh - 120px);">
    <BaseDataTable
      :columns="tableColumns"
      :rows="filteredRows"
      :is-loading="store.isLoading"
      striped
      max-height="100%" 
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "@/store/modules/appStore"; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseDataTable from "@/components/common/BaseDataTable.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseSearch from "@/components/common/BaseSearch.vue";

const store = useAppStore();
const selectedStage = ref(""); 
const searchTerm = ref("");

// Trigger the data load
onMounted(() => {
    store.loadData();
});

const tableColumns = [
  { key: "accountName", label: "Account Name", isSortable: true, width: "15%" },
  { key: "parentAccountName", label: "Parent Account", isSortable: true, width: "15%" }, 
  { key: "specialty", label: "Specialty", isSortable: true, width: "10%" },

  // ... Journey Group ...
  { key: "journeyStage", label: "Stage", isSortable: true, width: "12%"},
  { key: "nextActivity", label: "Next Activity", isSortable: true, width: "18%" },
  { key: "channel", label: "Channel", isSortable: true, width: "10%" },
  
  { key: "city", label: "City", isSortable: true },
  { key: "lastCallDate", label: "Last Call", isSortable: true },
];

const stageOptions = computed(() => {
    return store.journeyStageOptions || [];
});

const baseRows = computed(() => {
  const accountMap = store.accountMap || {}; 

  return Object.values(accountMap)
    .filter(account => account.ispersonaccount__v === true)
    .map((account) => {
      
      const rawDate = account.lastCallDate;
      const formattedDate = rawDate 
          ? new Date(rawDate).toLocaleDateString() 
          : "--";

      const stageDisplay = account.journeyStageName || "Awareness";

      return {
        accountName: {
            value: account.name__v,
            display: account.name__v,
            alignContent: "start",
        },
        parentAccountName: {
            value: account.parentName || "", 
            display: account.parentName || "--", 
        },
        specialty: {
            value: account.specialtyLabel,
            display: account.specialtyLabel || "--",
        },
        journeyStage: {
            value: stageDisplay,
            display: stageDisplay
        },
        nextActivity: {
            value: account.nextActivity || "No Activity",
            display: account.nextActivity || "--"
        },
        channel: {
            value: account.activityChannel || "",
            display: account.activityChannel || "--"
        },
        city: {
            value: account.city || "",
            display: account.city || "--",
        },
        lastCallDate: {
            value: rawDate || "",
            display: formattedDate 
        },
      };
    });
});

const filteredRows = computed(() => {
    let rows = baseRows.value;

    if (selectedStage.value) {
        rows = rows.filter(row => row.journeyStage.value === selectedStage.value);
    }

    if (searchTerm.value) {
        const lowerTerm = searchTerm.value.toLowerCase();
        rows = rows.filter(row => 
            row.accountName.display.toLowerCase().includes(lowerTerm)
        );
    }

    return rows;
});

const totalHCPs = computed(() => {
  return filteredRows.value.length;
});
</script>

<style scoped>
/* We use :deep() because we are styling elements inside 
   the Child Component (BaseDataTable) 
*/

/* 1. SEPARATION: Add Borders to the Group (Columns 3, 4, 5) */
/* .journey-table-container :deep(table th:nth-child(3)),
.journey-table-container :deep(table td:nth-child(3)) {
    border-left: 3px solid #dee2e6 !important; 
} */

/* .journey-table-container :deep(table th:nth-child(5)),
.journey-table-container :deep(table td:nth-child(5)) {
    border-right: 3px solid #dee2e6 !important; 
} */

/* 2. GROUPING: Change Header Background for the Journey Columns */
.journey-table-container :deep(table thead th:nth-child(4)),
.journey-table-container :deep(table thead th:nth-child(5)),
.journey-table-container :deep(table thead th:nth-child(6)) {
    background-color: #e9ecef !important; /* Darker Grey */
    padding-top: 35px; /* Make room for the text above */
    position: relative; /* Needed for the absolute text positioning */
    vertical-align: bottom;
}

/* 3. SUPER HEADER: The "CSS Hack" to add text spanning columns */
/* We target the MIDDLE column (4) and add a pseudo-element above it */
.journey-table-container :deep(table thead th:nth-child(5)::after) {
    content: "CUSTOMER JOURNEY"; /* The Title */
    
    /* Position it above the existing headers */
    position: absolute;
    top: 5px; 
    
    /* Center it relative to the 3 columns. 
       Since this is attached to the middle column, we stretch it left and right.
    */
    left: -50%; 
    width: 200%; 
    
    /* Styling */
    text-align: center;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1px;
    color: #6c757d;
    display: block;
}
</style>