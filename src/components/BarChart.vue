<template>
  <Bar v-if="loaded" :chart-data="chartData" />
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
      console.log("computed.chartData");
      console.log(this.chartData);
      return this.chartData;
    }
  },
  // setup() {
  //   const chartData = this.computed(() => {
  //     labels: this.chartData.labels;
  //     datasets: this.chartData.datasets;
  //   })
  // },
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
      //console.log(store);
      this.renderChart({
        labels: this.chartData.labels,
        datasets: this.chartData.datasets,
      });
    },
  },
  mounted() {
    this.loaded = false;
    //this.renderChart();
    this.loaded = true;
  },
};
</script>
