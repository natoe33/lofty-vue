<script setup>
import HelloWorld from "../components/HelloWorld.vue";
import NavBar from "../components/NavBar.vue";
</script>

<script>
export default {
  data() {
    return {
      isSidebarActive: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
      console.log("emmitting togSidebar");
    },
  },
};
</script>

<template>
  <main>
    <NavBar />
    <HelloWorld msg="Hello" />
  </main>
</template>

<style></style>
