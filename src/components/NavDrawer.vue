<template>
  <v-system-bar color="indigo darken-3"></v-system-bar>
  <v-app-bar color="indigo accent-4" dark density="compact" :elevation="9">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Lofty Income</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" class="w-auto" absolute bottom temporary>
    <v-list nav dense>
      <!--<v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <v-list-item-title>
            <router-link
              class="text-decoration-none"
              v-if="showHome"
              @click="updateHomeVal"
              to="/import"
              >Import</router-link
            >
            <router-link
              class="text-decoration-none"
              @click="updateHomeVal"
              v-else
              to="/"
              >Home</router-link
            >
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>-->
      <v-list-group value="Addresses">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-map-marker-circle"
            title="Addresses"
          >
          </v-list-item>
        </template>
        <v-list-group
          v-for="(state, index) in listings"
          :value="state.state">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="state.state" prepend-icon="mdi-folder-home-outline"></v-list-item>
          </template>
          <v-list-item
            v-for="listing in listings[state.state].data"
            :key="listing.id"
            :title="listing.address"
            :value="listing.listing"
            v-on:click="listingClicked(listing.id, listing.address)"
          >
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    <!-- -->
  </v-navigation-drawer>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useListingStore } from "@/stores/listings";
import { useChartStore } from "@/stores/charts";

export default {
  name: "NavDrawer",

  setup() {
    // Locals
    const home = ref(true);

    // State
    const store = useListingStore();
    const { fetchListingByState } = store;
    const charts = useChartStore();
    const { fetchListingLimit } = charts;

    // Functions
    const updateHomeVal = () => {
      home.value = !home.value;
    };
    const listingClicked = (id, address) => {
      fetchListingLimit(id, address);
    }

    onMounted(() => {
      console.log("On mount");
      fetchListingByState();
    });

    return {
      showHome: computed(() => home.value),
      updateHomeVal,
      states: computed(() => store.states),
      listings: computed(() => store.byState),
      fetchListingLimit,
      listingClicked,
    };
  },
  data: () => ({
    drawer: false,
    group: null,
    cruds: [],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
