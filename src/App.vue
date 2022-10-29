<template>
  <v-app>
    <NavDrawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { onBeforeMount } from "vue";
import { useListingStore } from "@/stores/listings";
import NavDrawer from "@/components/NavDrawer.vue";
export default {
  name: "App",
  components: {
    NavDrawer,
  },
  setup() {
    const store = useListingStore();
    const { fetchStates } = store;
    onBeforeMount(() => {
      fetchStates();
    });
  },
};
</script>
