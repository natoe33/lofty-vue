<template>
  <div class="level-left">
    <div class="level-item">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a
            role="button"
            @click="setBurgerActive"
            :class="{ 'is-active': burgerActive }"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="mainNav"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="mainNav"
          :class="{ 'is-active': burgerActive }"
          class="navbar-menu"
        >
          <div class="navbar-start">
            <router-link class="navbar-item" v-if="home" to="/import"
              >Import</router-link
            >
            <router-link class="navbar-item" v-else to="/">Home</router-link>
            <div
              v-if="home"
              class="navbar-item has-dropdown is-hoverable"
              @click="setItemActive"
              :class="{ 'is-active': addressActive }"
            >
              <a class="navbar-link">Addresses</a>
              <div class="navbar-dropdown">
                <div
                  class="navbar-item"
                  v-for="(state, index) in states"
                  :key="state.state"
                  :index="index"
                >
                  <ul>
                    <a class="navbar-item">{{ state.state }}</a>
                    <div v-for="listing in listings">
                      <a
                        class="navbar-item"
                        v-on:click="
                          $emit('listingClicked', [
                            listing.id,
                            listing.address,
                            limit,
                          ])
                        "
                        v-if="listing.state == state.state"
                        >{{ listing.address }}</a
                      >
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
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
const limit = ref(30);
const addressActive = ref(false);
const burgerActive = ref(false);

const setItemActive = (event) => {
  addressActive.value = !addressActive.value;
};

const setBurgerActive = () => {
  burgerActive.value = !burgerActive.value;
};

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
