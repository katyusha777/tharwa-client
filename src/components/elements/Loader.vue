<script setup lang="ts">
defineProps<{
  loaderClass?: string
}>()
</script>

<template>
  <div class="loader-container" :class="loaderClass">
    <div class="loader">
      <img src="/assets/loader.svg" alt="">
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
}

.loader {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
