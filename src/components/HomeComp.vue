<script>
import BarChart from "./BarChart.vue";

import { storeToRefs } from "pinia";
import { useChartStore } from "../stores/charts";

export default {
  name: "HomeComp",
  components: {
    BarChart,
  },
  props: {
    msg: String,
  },
  setup() {
    const { chartData, chartOptions, loading, error } = storeToRefs(
      useChartStore()
    );
    const { fetchDailyValues, fetchListingLimit } = useChartStore();
    //fetchDailyValues();

    return {
      chartData,
      chartOptions,
      loading,
      error,
      fetchDailyValues,
      fetchListingLimit,
    };
  },
  mounted() {
    this.fetchDailyValues();
  },
};
</script>

<template>
  <el-row class="row-bg" justify="center">
    <el-col :span="10">
      <h1>Lofty Daily Income</h1>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="23">
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
    </el-col>
  </el-row>
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
