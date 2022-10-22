<template>
  <Bar v-if="loaded" :chart-data="chartData" />
</template>
<script>
import { Bar } from "vue-chartjs";
import { useChartStore } from "../stores/charts";
const store = useChartStore();

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data: () => ({
    loaded: false,
  }),
  props: {
    chartData: {
      type: Object,
      required: false,
    },
  },
  methods: {
    renderChart: function () {
      this.loaded = false;
      console.log(store);
      this.renderChart({
        labels: this.store.chartData.labels,
        datasets: this.store.chartData.datasets,
      });
    },
  },
  mounted() {
    this.loaded = false;
    store.fetchDailyValues();
    this.renderChart();
    this.loaded = true;
  },
};
</script>
