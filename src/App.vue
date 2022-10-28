<template>
  <v-app>
    <NavDrawer />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
export default {
  name: 'App',
  components: {
    NavDrawer,
  },
}
</script>
