<script>
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    HelloWorld,
    NavBar,
  },
  data() {
    return {
      isSidebarActive: true,
      listingValues: [],
    };
  },
  methods: {
    onListingClicked(e) {
      console.log(`Received event 'ListingClicked':${e[0]} + ${e[1]}`);
    },
  },
};
</script>

<template>
  <main>
    <NavBar @ListingClicked="onListingClicked" />
    <HelloWorld msg="Hello" />
  </main>
</template>

<style></style>
