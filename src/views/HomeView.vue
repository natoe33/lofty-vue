<script>
import HomeComp from "@/components/HomeComp.vue";
import NavBar from "@/components/NavBar.vue";
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
    const { fetchDailyValues, fetchListingLimit } = useChartStore();
    return {
      fetchDailyValues,
      fetchListingLimit,
    };
  },
  methods: {
    onListingClicked(e) {
      //console.log(`Received event 'ListingClicked':${e[0]} + ${e[1]}`);
      this.fetchListingLimit(e[0], e[1], e[2]);
    },
  },
};
</script>

<template>
  <el-container>
    <el-header>
      <NavBar @ListingClicked="onListingClicked" :home="true" />
    </el-header>
    <el-main>
      <HomeComp msg="Hello" />
    </el-main>
  </el-container>
</template>

<style></style>
