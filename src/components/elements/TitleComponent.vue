<script setup lang="ts">
defineProps<{
  title: string
  noMargin?: boolean
  actionButton?: {
    title: string
    action: () => void
  }
}>()
</script>

<template>
  <div class="title-component flex justify-between">
    <h3 class="text-[32px] text-white barlow-condensed-regular" :class="{ noMargin }">
      {{ title }}
    </h3>
    <slot />
    <ButtonComponent v-if="actionButton" :label="actionButton.title" class="w-[180px]" @click="actionButton.action" />
  </div>
</template>

<style lang="scss" scoped>
h3 {
  margin: 1rem 0;

  &.noMargin {
    margin:0;
  }
}
</style>
