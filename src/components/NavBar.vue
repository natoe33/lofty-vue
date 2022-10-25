<template>
  <el-col :span="24">
    <!-- <el-menu default-active="2" class="el-menu-vertical" mode="horizontal"> -->
      <el-menu default-active="2" mode="horizontal">
      <el-menu-item v-if="home" index="1">
        <el-icon><icon-menu /></el-icon>
        <router-link to="/import">
          <el-link type="primary" :underline="false">Import</el-link>
        </router-link>
      </el-menu-item>
      <el-menu-item v-else index="1">
        <el-icon><icon-menu /></el-icon>
        <router-link to="/">
          <el-link type="primary" :underline="false">Home</el-link>
        </router-link>
      </el-menu-item>
      <el-sub-menu index="2" v-if="home">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Addresses</span>
        </template>
        <el-menu-item-group
          v-for="(state, index) in states"
          :key="state.state"
          :index="index"
        >
          <template #title>{{ state.state }}</template>
          <template v-for="listing in listings" :key="listing.id">
            <el-menu-item
              v-if="listing.state == state.state"
              v-on:click="$emit('listingClicked', [listing.id, listing.address, 30])"
              :index="listing.listing"
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

<script setup>
import { Location, House, Menu as IconMenu } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  home: {
    type: Boolean,
    required: true,
  },
});

const states = ref([]);
const listings = ref([]);

const loadStates = async () => {
  await fetch("https://api.nateflateau.com/api/states")
    .then((response) => response.json())
    .then((data) => {
      states.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const loadListings = async () => {
  await fetch("https://api.nateflateau.com/api/listings")
    .then((response) => response.json())
    .then((data) => {
      listings.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(() => {
  loadStates();
  loadListings();
});
</script>
<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
  /*min-height: 100px;*/
  float: left;
}
</style>
