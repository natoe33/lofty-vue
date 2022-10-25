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
      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="limit"
            value="30"
            @click="radioSelected(30)"
            checked
          />1 month
        </label>
        <label class="radio">
          <input
            type="radio"
            name="limit"
            value="90"
            @click="radioSelected(90)"
          />3 months
        </label>
        <label class="radio">
          <input
            type="radio"
            name="limit"
            value="180"
            @click="radioSelected(180)"
          />
          6 months
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
