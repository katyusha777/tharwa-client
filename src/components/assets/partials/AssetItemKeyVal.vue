<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  title: string
  value: string | number | null | undefined
}>()

const slots = useSlots()
</script>

<template>
  <div>
    <div class="text-xs text-gray-600 mb-0.5">
      {{ title }}
    </div>

    <!-- If slot content exists, render it. Otherwise, fallback to value -->
    <div v-if="slots.default">
      <slot />
    </div>
    <div v-else-if="value" class="text-sm font-medium text-white">
      {{ value }}
    </div>
  </div>
</template>
