<script setup lang="ts">
import { computed } from 'vue'

type BadgeKind = 'success' | 'fail' | 'warning'
type BadgeSize = 'small' | 'medium' | 'large'

const props = defineProps<{
  title: string
  kind: BadgeKind
  rowReverse?: boolean
  pulse?: boolean
  size?: BadgeSize
}>()

const pulse = computed(() => props.pulse !== false)

const kindColor = computed(() => {
  switch (props.kind) {
    case 'success':
      return 'var(--color-green)'
    case 'fail':
      return 'var(--color-red)'
    case 'warning':
      return 'var(--color-yellow)'
  }
})

const sizeClasses = computed(() => {
  switch (props.size || 'medium') {
    case 'small':
      return {
        text: 'text-xs',
        dot: 'w-1.5 h-1.5',
        gap: 'gap-1',
      }
    case 'large':
      return {
        text: 'text-base',
        dot: 'w-2.5 h-2.5',
        gap: 'gap-2',
      }
    default:
      return {
        text: 'text-sm',
        dot: 'w-2 h-2',
        gap: 'gap-1.5',
      }
  }
})
</script>

<template>
  <div
    class="inline-flex items-center" :class="[
      sizeClasses.gap,
      rowReverse ? 'flex-row-reverse ' : '',
    ]"
  >
    <span
      class="rounded-full relative "
      :class="[
        sizeClasses.dot,
        size === 'small' ? 'top-[1px] ' : 'top-.5 ',

        pulse ? 'animate-pulse ' : '',
      ]"
      :style="{ backgroundColor: kindColor }"
    />
    <span :class="sizeClasses.text" :style="{ color: kindColor }">
      {{ title }}
    </span>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 1.2s infinite;
}
</style>
