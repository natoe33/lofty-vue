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
    const { chartData, loading, error } = storeToRefs(useChartStore());
    const { fetchDailyValues, fetchListingLimit } = useChartStore();
    //fetchDailyValues();

    return {
      chartData,
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
  <div class="greetings">
    <h1>Lofty Daily Income</h1>
    <BarChart :chart-data="chartData" />
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
