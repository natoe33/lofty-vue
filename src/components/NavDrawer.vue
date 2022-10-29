<template>
  <v-system-bar color="indigo darken-3"></v-system-bar>
  <v-app-bar color="indigo accent-4" dark prominent>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" absolute bottom temporary>
    <v-list nav dense>
      <v-list-item-group
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
      <v-divider></v-divider>
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
          v-for="(state, index) in states"
          value="{{state.state}}"
          :key="state.state"
          :index="index"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">{{ state.state }}</v-list-item>
          </template>
          <v-list-item
            v-for="listing in listings[state.state].data"
            :key="listing.id"
            :title="listing.address"
            :value="listing.listing"
          >
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    <!-- -->
  </v-navigation-drawer>
</template>
<script>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useListingStore } from "@/stores/listings";

export default {
  name: "NavDrawer",

  setup() {
    const home = ref(true);
    const store = useListingStore();
    const { fetchListingByState } = store;

    const updateHomeVal = () => {
      home.value = !home.value;
    };
    onBeforeMount(() => {
      //   console.log("Before mount");
      //   fetchListingByState();
    });
    onMounted(() => {
      console.log("On mount");
      fetchListingByState();
    });
    // onUpdated(() => {
    //   console.log("On update");
    //   fetchStates();
    //   fetchListingByState();
    // });

    return {
      showHome: computed(() => home.value),
      updateHomeVal,
      states: computed(() => store.states),
      listings: computed(() => store.byState),
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
