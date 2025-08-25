<script setup lang="ts">
import type { TSentimentScore } from '@types'

defineProps<{
  sentiment: TSentimentScore
}>()

function getSentimentIcon(score: TSentimentScore) {
  switch (score) {
    case 1: return 'fa-light fa-arrow-trend-up'
    case -1: return 'fa-light fa-arrow-trend-down'
    default: return 'fa-light fa-grip-lines'
  }
}

function getSentimentColor(score: TSentimentScore) {
  switch (score) {
    case 1: return 'text-green-500'
    case -1: return 'text-red-500'
    default: return 'text-gray-500'
  }
}

function getSentimentLabel(score: TSentimentScore) {
  switch (score) {
    case 1: return 'Positive'
    case -1: return 'Negative'
    default: return 'Neutral'
  }
}
</script>

<template>
  <div class="flex items-center gap-2" :class="[getSentimentColor(sentiment)]">
    <i
      class="text-base"
      :class="[getSentimentIcon(sentiment)]"
    />
    <span class="text-sm">
      {{ getSentimentLabel(sentiment) }}
    </span>
  </div>
</template>
