<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="mainNav">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="mainNav" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" v-if="home" to="/import">Import</router-link>
        <router-link class="navbar-item" v-else to="/">Home</router-link>
        <div v-if="home" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Addresses</a>
          <div class="navbar-dropdown">
            <div class="navbar-item" v-for="(state, index) in states" :key="state.state" :index="index">
              <ul><a class="navbar-item">{{ state.state }}</a>
                <div v-for="listing in listings">
                  <a class="navbar-item" v-if="listing.state == state.state">{{ listing.address }}</a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- <el-menu default-active="2" class="el-menu-vertical" mode="horizontal"> -->
  <el-menu default-active="2" mode="horizontal">
    <el-sub-menu index="2" v-if="home">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>Addresses</span>
      </template>
      <el-menu-item-group v-for="(state, index) in states" :key="state.state" :index="index">
        <template #title>{{ state.state }}</template>
        <template v-for="listing in listings" :key="listing.id">
          <el-menu-item v-if="listing.state == state.state"
            v-on:click="$emit('listingClicked', [listing.id, listing.address, 30])" :index="listing.listing">
            <el-icon>
              <house />
            </el-icon>
            {{ listing.address }}
          </el-menu-item>
        </template>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
//import { Location, House, Menu as IconMenu } from "@element-plus/icons-vue";
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
