<script setup lang="ts">
import type { TPortfolioAsset } from '@types'
import { Icon } from '@iconify/vue'

defineProps<{
  assets: TPortfolioAsset[]
}>()
</script>

<template>
  <div class="space-y-3">
    <AssetItem
      v-for="asset in assets"
      :key="asset.id"
      :portfolio-asset="asset"
    >
      <template #actions>
        <slot name="actions" :asset="asset" />
      </template>
    </AssetItem>

    <div v-if="assets.length === 0" class="text-center py-12">
      <Icon icon="mdi:package-variant-closed" class="text-4xl text-gray-700 mb-3" />
      <p class="text-gray-500">
        No assets in portfolio
      </p>
    </div>
  </div>
</template>
