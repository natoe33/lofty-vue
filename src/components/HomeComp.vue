<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-3xl font-medium text-900 mb-3">Lofty Daily Income</div>
    <div style="height: 450px" class="border-2 border-dashed surface-border">
      <BarChart :chart-data="data" :chart-options="options" />
      <SelectButton v-model="lim" :options="limitOptions" dataKey="value" optionLabel="name" @click="radioSelected"
        aria-labelledby="single" />
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
    //const { limit, getDateLimit } = storeToRefs(store);
    const { fetchDailyValues, updateLimit, getDateLimit } = store;

    const limitOptions = ref([
      { name: '1 month', value: 30 },
      { name: '3 months', value: 90 },
      { name: '6 months', value: 180 }
    ]);
    const lim = ref();

    const radioSelected = () => {
      // trying to figure out how to set date limit using store.limit
      // console.log(getDateLimit.value);
      console.log(limitOptions.value.map(e => e.value).indexOf(90));
      console.log(limitOptions.value.indexOf(90));
      updateLimit(lim.value[lim]);
    };

    onMounted(() => {
      fetchDailyValues();
    })

    return {
      lim, limitOptions, store, radioSelected,
      data: computed(() => store.chartData),
      options: computed(() => store.chartOptions),
    }
  },
}
</script>
<style scoped>

</style>
