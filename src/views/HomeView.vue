<script>
import HomeComp from "@/components/HomeComp.vue";
import NavBar from "@/components/NavBar.vue";
import { storeToRefs } from "pinia";
import { useChartStore } from "../stores/charts";

export default {
  components: {
    HomeComp,
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
    <HomeComp msg="Hello" />
  </main>
</template>

<style></style>
