<script setup>
import HelloWorld from '../components/HelloWorld.vue';
import NavBar from "../components/NavBar.vue";
</script>

<script>
export default {
  data() {
    return {
      isSidebarActive: true
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
      console.log('emmitting togSidebar');
    }
  }
}
</script>

<template>
  <main>
    <button class="btn btn-primary" @click="$emit('togSidebar')">{{isSidebarActive ? 'Close Sidebar' : 'Open Sidebar'}}</button>
    <NavBar />
    <ui-button icon="add" @click="$alert('Hello World')">Click Me</ui-button>
    <HelloWorld msg="Hello" />
  </main>
</template>
