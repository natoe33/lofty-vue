<template>
  <Bar :chart-data="chartData" />
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
  props: {
    chartData: {
      type: Object,
      required: false,
    },
  },
  methods: {
    renderChart: function () {
      this.renderChart({
        labels: this.chartData.labels,
        datasets: this.chartData.datasets,
      });
    },
  },
  watch: {
    chartData: function () {
      this._chart.destroy();
      this.renderChart();
    },
  },
};
</script>
