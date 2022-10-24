<template>
  <Bar v-if="loaded" :chart-data="chartData" :chart-options="chartOptions" />
</template>
<script>
import { Bar } from "vue-chartjs";

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
  computed: {
    chartData() {
      return this.chartData;
    },
  },
  data: () => ({
    loaded: false,
  }),
  props: {
    chartOptions: {
      type: Object,
      required: false,
    },
  },
  methods: {
    renderChart: function () {
      this.loaded = false;
      this.renderChart({
        labels: this.chartData.labels,
        datasets: this.chartData.datasets,
      });
    },
  },
  mounted() {
    this.loaded = false;
    this.loaded = true;
  },
};
</script>
