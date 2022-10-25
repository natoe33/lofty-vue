<template>
  <!-- <el-row>
    <el-col :span="24">
      <h1>Read CSV</h1>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-upload
        ref="upload"
        class="upload"
        action="https://api.nateflateau.com/api/submit"
        accept="csv"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :on-success="handleSuccess"
      >
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
      </el-upload>
      <el-button class="ml-3" type="success" @click="submitUpload"
        >Read</el-button
      >
      <template #tip>
        <div class="el-upload__tip text-red">limit 1 file</div>
      </template>
    </el-col>
  </el-row>
  <el-main class="main">
    <div ref="table"></div>
  </el-main> -->
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
//import { genFileId } from "element-plus";
//import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
//import { TabulatorFull as Tabulator } from "tabulator-tables";

// const upload = ref<UploadInstance>();

// const handleExceed: UploadProps['onExceed'] = (files) => {
//     upload.value!.clearFiles();
//     const file = files[0] as UploadRawFile;
//     file.uid = genFileId();
//     upload.value!.handleStart(file);
// }

// const submitUpload = () => {
//     upload.value!.submit()
// }

const handleSuccess = () => {
  alert("Upload successful");
}

</script>
<style scoped>
/* .main {
  float: left;
  padding-left: 2rem;
}
.main h1,
.main h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .main h1,
  .main h3 {
    text-align: left;
  }
} */
</style>
