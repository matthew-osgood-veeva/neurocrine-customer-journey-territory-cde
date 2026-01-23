<template>
  <div class="p-2">
    <div class="xp-card">
      <div class="xp-card__header">
        <div class="xp-card__header-heading">
          <div class="xp-card__header-icon">
            <FontAwesomeIcon :icon="faUser" size="lg" />
          </div>
          <div class="xp-card__header-titles">
            <div class="xp-card__header-title">HCP Details</div>
            <div class="xp-card__header-subtitle">Subtitle</div>
          </div>
        </div>
        <div class="xp-card__header-end">
          <div>filters</div>
          <div>helpIcon</div>
        </div>
      </div>
      <div class="xp-card__body">
        Prop:
        {{ appStore.userId }}
        <br />
        <br />
        Veeva Message:
        {{ t("ACCOUNTS") }}

        <div class="hello">hello world</div>
        <BaseBarChart 
          :data="barChartData"
          :options="barChartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseBarChart from "@/components/common/BaseBarChart.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppStore } from '@/store/modules/appStore';
const appStore = useAppStore();
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const barChartData = {
  series: [
    {
      name: "Series 1",
      type: "bar",
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ],
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}

const barChartOptions = {
  yAxisName: 'Day'
}

</script>

<style scoped>
.hello {
  color: var(--veeva-green-400);
}
</style>