<script setup lang="ts">
import { useSlots } from 'vue'

const props = defineProps<{
  title: string
  value: string | number | null | undefined
}>()

const slots = useSlots()
</script>

<template>
  <div>
    <div class="text-sm text-gray-300 mb-1 barlow-condensed-regular uppercase">
      {{ title }}
    </div>

    <!-- If slot content exists, render it. Otherwise, fallback to value -->
    <div v-if="slots.default">
      <slot />
    </div>
    <div v-else-if="value" class="barlow-condensed-regular text-[18px] uppercase">
      {{ value }}
    </div>
  </div>
</template>
