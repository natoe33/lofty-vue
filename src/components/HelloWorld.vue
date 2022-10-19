<script setup>
import BarChart from "./BarChart.vue";
const labels = ["A", "B", "C"];
const values = [1, 2, 3];

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<script>
const chartInstance = this.$refs.bar.chart;
chartInstance.chartData = values;
chartInstance.chartLabels = labels;
</script>

<template>
  <div class="greetings">
    <BarChart ref="bar" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
.greetings {
  float: left;
  padding-left: 2rem;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
