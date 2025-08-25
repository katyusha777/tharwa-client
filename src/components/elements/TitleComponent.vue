<script setup lang="ts">
defineProps<{
  title: string
  noMargin: boolean
}>()
</script>

<template>
  <h3 class="text-[32px] text-white barlow-condensed-regular" :class="{ noMargin }">
    {{ title }}
  </h3>
</template>

<style lang="scss" scoped>
h3 {
  margin: 1rem 0;

  &.noMargin {
    margin:0;
  }
}
</style>
