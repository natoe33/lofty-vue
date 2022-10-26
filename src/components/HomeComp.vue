<script setup>
import { onMounted } from "vue";
import BarChart from "./BarChart.vue";
import { storeToRefs } from "pinia";
import { useChartStore } from "../stores/charts";

const { chartData, chartOptions, limit } = storeToRefs(useChartStore());
const { fetchDailyValues, updateLimit } = useChartStore();

const radioSelected = (item) => {
  updateLimit(item);
  console.log(`limit: ${limit.value}`);
};

onMounted(() => {
  console.log(`limit: ${limit.value}`);
  fetchDailyValues();
});
</script>

<template>
  <div class="container">
    <h1 class="title">Lofty Daily Income</h1>
    <div class="box">
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
      <div class="tabs is-toggle">
        <ul>
          <li class="is-active">
            <a>
              <span @click="radioSelected(30)">1 month</span>
            </a>
            </li> 
          <li>
            <a>
              <span @click="radioSelected(90)">3 months</span>
        </a>
        </li>
        <li>
            <a>
              <span @click="radioSelected(180)">6 months</span>
        </a>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
