<template>
  <el-col :span="3">
    <el-menu default-active="1" class="el-menu-vertical">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Addresses</span>
        </template>
        <el-menu-item-group v-for="state in states" :key="state.state">
          <template #title>{{ state.state }}</template>
          <template v-for="listing in listings" :key="listing.id">
            <el-menu-item
              v-if="listing.state == state.state"
              v-on:click="$emit('listingClicked', [listing.id, 20])"
            >
              <el-icon><house /></el-icon>
              {{ listing.address }}
            </el-menu-item>
          </template>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script>
import { Location, House } from "@element-plus/icons-vue";
export default {
  name: "NavBar",
  emits: ["ListingClicked", "listingClicked"],
  components: {
    Location,
    House,
  },
  data() {
    return {
      states: [],
      listings: [],
    };
  },
  methods: {
    async getStates() {
      await fetch("http://192.168.4.97:8090/api/states")
        .then((response) => response.json())
        .then((data) => {
          this.states = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async getListings() {
      await fetch("http://192.168.4.97:8090/api/listings")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.listings = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    listingClicked(event) {
      console.log("listing clicked");
      this.$emit("ListingClicked", event.target.value);
    },
    async getListingData() {
      console.log(`clicked`);
    },
  },
  created() {
    // console.log("NavBar.created()");
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
