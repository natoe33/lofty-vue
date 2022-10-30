<template>
  <v-card class="mx-auto mx-xs-2 my-7 w-xs-auto w-75">
    <BarChart :chart-data="data" :chart-options="options" />
    <v-card-actions>
    <v-btn-toggle v-model="text" tile color="deep-purple accent-3" group>
      <v-btn density="compact" size="x-small" ripple v-for="limits in limitOptions" :value="limits.value" v-on:click="limitSelected(limits.value)">{{ limits.name }}
      </v-btn>
    </v-btn-toggle>
    </v-card-actions>
  </v-card>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import BarChart from "./BarChart.vue";
//import LineChart from "./LineChart.vue";
import { storeToRefs } from "pinia";
import { useChartStore } from "@/stores/charts";

export default {
  components: {
    BarChart,
//    LineChart
  },
  data() {
    return {
      text: 30,
    }
  },
  setup() {
    const store = useChartStore();
    //const { limit, getDateLimit } = storeToRefs(store);
    const { fetchDailyValues, updateLimit, getDateLimit } = store;

    const limitOptions = ref([
      { name: "1 month", value: 30 },
      { name: "3 months", value: 90 },
      { name: "6 months", value: 180 },
      { name: "9 months", value: 270 },
      { name: "1 year", value: 365 },
    ]);
    const limit = ref();

    const limitSelected = (value) => {
      updateLimit(value);
    };

    onMounted(() => {
      fetchDailyValues();
    });

    return {
      limit,
      limitOptions,
      store,
      limitSelected,
      data: computed(() => store.chartData),
      options: computed(() => store.chartOptions),
    };
  },
};
</script>
