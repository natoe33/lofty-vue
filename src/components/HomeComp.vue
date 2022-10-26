<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-3xl font-medium text-900 mb-3">Lofty Daily Income</div>
    <div style="height: 450px" class="border-2 border-dashed surface-border">
      <BarChart :chart-data="data" :chart-options="options" />
      <SelectButton v-model="value2" :options="limitOptions" dataKey="value" optionLabel="name"
        @click="radioSelected" aria-labelledby="single" />
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import BarChart from "./BarChart.vue";
import { storeToRefs } from "pinia";
import { useChartStore } from "@/stores/charts";

export default {
  components: {
    BarChart,
  },
  setup() {
    const store = useChartStore();
    // const { chartData, chartOptions, limit } = storeToRefs(store);
    const { fetchDailyValues, updateLimit } = store;

    const value2 = ref();
    const value3 = ref();
    const options = ref(['Off', 'On']);
    const limitOptions = ref([
      { name: '1 month', value: 30 },
      { name: '3 months', value: 90 },
      { name: '6 months', value: 180 }
    ]);
    const radioSelected = () => {
      updateLimit(value2.value['value']);
      console.log(value2.value['value']);
      store.fetchDailyValues();
    };

    onMounted(() => {
      fetchDailyValues();
    })

    return {
      value2, value3, options, limitOptions, store, radioSelected,
      data: computed(() => store.chartData),
      options: computed(() => store.chartOptions),
    }
  },
}
</script>
<style scoped>

</style>
