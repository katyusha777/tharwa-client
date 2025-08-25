<script setup lang="ts">
const symbol = ref('')
</script>

<template>
  <header>
    <div class="mb-4 mt-8">
      <SubtitleComponent title="Asset search" />
    </div>
    <InputComponent v-model="symbol" label="Symbol" />
  </header>
</template>
