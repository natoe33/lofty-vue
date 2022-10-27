<template>
    <div class="container">
      <div class="level">
        <NavBar :home="false" />
      </div>
      <section class="surface-card">
        <CsvImport />
      </section>
      <div class="">
      </div>
    </div>
</template>

<script setup>
import CsvImport from "@/components/CsvImport.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    /*align-items: center;*/
  }
}
</style>
