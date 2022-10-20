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
      this.getListingDataLimit(e[0], e[1]);
    },
    async getListingData(listing) {
      await fetch(`http://192.168.4.97:8090/api/listing_values?id=${listing}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async getListingDataLimit(id, lim) {
      await fetch(`http://192.168.4.97:8090/api/listing_values`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing: id,
          limit: lim,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
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
