<template>
  <el-col :span="3">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Addresses</span>
        </template>
        <el-menu-item-group v-for="state in states" :key="state.state">
          <template #title>{{ state.state }}</template>
          <template v-for="listing in listings" :key="listing.listing">
            <el-menu-item v-if="listing.state == state.state">
              {{ listing.address }}
            </el-menu-item>
          </template>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script setup>
import { Location } from "@element-plus/icons-vue";
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      states: [],
      listings: [],
    };
  },
  methods: {
    async getStates() {
      let response = await fetch("http://192.168.4.97:8090/api/states");
      this.states = await response.json();
      console.log(this.states);
    },
    async getListings() {
      console.log("Fetching data: NavBar");
      let response = await fetch("http://192.168.4.97:8090/api/listings");
      this.listings = await response.json();
      console.log(this.listings);
    },
  },
  created() {
    console.log("NavBar.created()");
    this.getStates();
    this.getListings();
  },
};
</script>
<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
  /*min-height: 100px;*/
  float: left;
}
</style>
