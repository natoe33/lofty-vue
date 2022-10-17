<script setup>
import HelloWorld from '../components/HelloWorld.vue';
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
    <HelloWorld msg="Hello" />
  </main>
</template>
