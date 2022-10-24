<template>
  <main>
    <el-container>
      <el-aside width="250px">
        <NavBar :home="false" />
      </el-aside>
      <el-main>
        <CsvImport />
      </el-main>
    </el-container>
  </main>
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
