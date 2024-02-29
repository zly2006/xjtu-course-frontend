<script setup lang="ts">

</script>

<template>
  <div class="main-page">
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          block
          href="/course-schedule"
        >
          课程表
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style>
body {
  --side-padding: 16px;
}

.main-page {
  max-width: 500px;
  padding: 50px;
  margin: auto;
  height: calc(100vh - 128px);
}

* {
  touch-action: manipulation;
}
</style>
