<script>
import HomeComp from "@/components/HomeComp.vue";
import NavBar from "@/components/NavBar.vue";
import { useChartStore } from "@/stores/charts";

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
    const { fetchDailyValues, fetchListingLimit } = useChartStore();
    return {
      fetchDailyValues,
      fetchListingLimit,
    };
  },
  methods: {
    onListingClicked(e) {
      //console.log(`Received event 'ListingClicked':${e[0]} + ${e[1]}`);
      this.fetchListingLimit(e[0], e[1]);
    },
  },
  created() {
    console.log("HomeView fetching daily values");
    this.fetchDailyValues();
  },
};
</script>

<template>
  <div class="container">
    <div class="level">
      <NavBar @ListingClicked="onListingClicked" :home="true" />
    </div>
    <section class="section">
      <HomeComp />
    </section>
  </div>
</template>

<style>

</style>
