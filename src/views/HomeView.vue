<script>
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/NavBar.vue";
import { storeToRefs } from "pinia";
import { useChartStore } from "../stores/charts";

export default {
  components: {
    HelloWorld,
    NavBar,
  },
  data() {
    return {
      isSidebarActive: true,
      listingValues: [],
    };
  },
  setup() {
    const { chartData, loading, error } = storeToRefs(useChartStore());
    const { fetchDailyValues, fetchListingLimit } = useChartStore();
    return {
      fetchDailyValues,
      fetchListingLimit,
    };
  },
  methods: {
    onListingClicked(e) {
      console.log(`Received event 'ListingClicked':${e[0]} + ${e[1]}`);
      this.fetchListingLimit(e[0], e[1]);
    },
  },
};
</script>

<template>
  <main>
    <NavBar @ListingClicked="onListingClicked" />
    <HelloWorld msg="Hello" />
  </main>
</template>

<style></style>
