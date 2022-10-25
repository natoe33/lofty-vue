<script setup>
import { onMounted, ref } from "vue";
import BarChart from "./BarChart.vue";
import { storeToRefs } from "pinia";
import { useChartStore } from "../stores/charts";

const { chartData, chartOptions, loading, error } = ref(storeToRefs(useChartStore()));
const { fetchDailyValues, fetchListingLimit } = ref(useChartStore());

const props = ref(defineProps({
  msg: {
    type: String,
    required: false
  }
})
)

onMounted(() => {
  fetchDailyValues();
})
// export default {
//   name: "HomeComp",
//   components: {
//     BarChart,
//   },
//   props: {
//     msg: String,
//   },
//   setup() {
//     const { chartData, chartOptions, loading, error } = storeToRefs(
//       useChartStore()
//     );
//     const { fetchDailyValues, fetchListingLimit } = useChartStore();
//     //fetchDailyValues();

//     return {
//       chartData,
//       chartOptions,
//       loading,
//       error,
//       fetchDailyValues,
//       fetchListingLimit,
//     };
//   },
//   mounted() {
//     console.log(this.chartOptions);
//     this.fetchDailyValues();
//   },
// };
</script>

<template>
  <div class="container">
    <h1 class="title">Lofty Daily Income</h1>
    <div class="box">
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
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
.main {
  float: left;
  padding-left: 2rem;
}
.main h1,
.main h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .main h1,
  .main h3 {
    text-align: left;
  }
}
</style>
