<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="barlow-condensed-regular text-[18px] uppercase -mb-2">
    <span>{{ title }}</span>
  </div>
</template>
