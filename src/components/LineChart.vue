<template>
    <Line v-if="loaded" :chart-data="chartData" :chart-options="chartOptions" />
</template>
<script>
import { Line } from "vue-chartjs";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Plugin,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

export default {
    name: "LineChart",
    components: { Line },
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
                chartOptions: this.chartOptions,
            });
        },
    },
    mounted() {
        this.loaded = false;
        this.loaded = true;
    },
}
</script>
<style scoped></style>