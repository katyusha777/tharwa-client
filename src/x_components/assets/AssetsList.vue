<script setup lang="ts">
import type { IPortfolioAsset, TSentimentScore } from '@types'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useModalStore } from '~/stores/modal'

defineProps<{
  assets: IPortfolioAsset[]
}>()

const modalStore = useModalStore()
const expandedAssets = ref<Set<string>>(new Set())

// Helper functions
function formatCurrency(value: number | string, currency: string = 'USD') {
  const num = typeof value === 'string' ? Number.parseFloat(value) : value
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

function formatCompactNumber(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toFixed(0)
}

function calculateAssetValue(asset: IPortfolioAsset) {
  const price = Number.parseFloat(asset.asset.latest_value)
  return price * asset.units
}

function getSentimentIcon(score: TSentimentScore) {
  switch (score) {
    case 1: return 'mdi:trending-up'
    case -1: return 'mdi:trending-down'
    default: return 'mdi:minus'
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

function formatDate(dateString: string) {
  if (!dateString)
    return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toggleExpanded(assetId: string) {
  if (expandedAssets.value.has(assetId)) {
    expandedAssets.value.delete(assetId)
  }
  else {
    expandedAssets.value.add(assetId)
  }
}

function isExpanded(assetId: string) {
  return expandedAssets.value.has(assetId)
}

function handleEdit(asset: IPortfolioAsset) {
  modalStore.openAssetForm(asset.id)
}

function handleDelete(asset: IPortfolioAsset) {
  console.log('Delete asset:', asset)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Assets List -->
    <div
      v-for="asset in assets"
      :key="asset.id"
      class="bg-black border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-200"
    >
      <!-- Main Content -->
      <div class="p-4">
        <!-- Header Row -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="font-semibold text-white text-lg">
                {{ asset.asset.symbol }}
              </h3>
              <span
                class="text-xs" :class="[
                  asset.asset.is_shariah_compliant ? 'text-green-500' : 'text-red-500',
                ]"
              >
                ● {{ asset.asset.is_shariah_compliant ? 'Halal' : 'Non-Halal' }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ asset.asset.name }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2">
            <button
              class="p-1 transition-colors group"
              aria-label="Edit asset"
              @click="handleEdit(asset)"
            >
              <Icon icon="mdi:pencil" class="text-gray-600 hover:text-white text-sm" />
            </button>
            <button
              class="p-1 transition-colors group"
              aria-label="Delete asset"
              @click="handleDelete(asset)"
            >
              <Icon icon="mdi:trash-can" class="text-gray-600 hover:text-red-500 text-sm" />
            </button>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-3 gap-4 mb-3">
          <div>
            <p class="text-xs text-gray-600 mb-0.5">
              Value
            </p>
            <p class="text-sm font-medium text-white">
              {{ formatCurrency(calculateAssetValue(asset), asset.asset.currency) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-600 mb-0.5">
              Holdings
            </p>
            <p class="text-sm font-medium text-white">
              {{ formatCompactNumber(asset.units) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-600 mb-0.5">
              Price
            </p>
            <p class="text-sm font-medium text-white">
              {{ formatCurrency(asset.asset.latest_value, asset.asset.currency) }}
            </p>
          </div>
        </div>

        <!-- Sentiment Row -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-900">
          <div class="flex items-center gap-2">
            <Icon
              :icon="getSentimentIcon(asset.asset.sentiment_score)"
              class="text-base" :class="[getSentimentColor(asset.asset.sentiment_score)]"
            />
            <span class="text-sm" :class="[getSentimentColor(asset.asset.sentiment_score)]">
              {{ getSentimentLabel(asset.asset.sentiment_score) }}
            </span>
          </div>
          <button
            class="btn btn-link text-xs p-0 flex"
            @click="toggleExpanded(asset.id)"
          >
            <span>{{ isExpanded(asset.id) ? 'Less' : 'More' }} info</span>
            <Icon
              :icon="isExpanded(asset.id) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="text-sm relative"
            />
          </button>
        </div>
      </div>

      <!-- Expanded Sentiment Analysis -->
      <div
        v-if="isExpanded(asset.id) && asset.asset.sentiment_analysis"
        class="border-t border-gray-800"
      >
        <div class="p-4">
          <p class="text-sm text-gray-400 leading-relaxed">
            {{ asset.asset.sentiment_analysis }}
          </p>
          <div class="flex items-center gap-4 mt-3 text-xs text-gray-600">
            <span>Last updated: {{ formatDate(asset.asset.last_sentiment_update) }}</span>
            <span>Type: {{ asset.asset.asset_type }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="assets.length === 0" class="text-center py-12">
      <Icon icon="mdi:package-variant-closed" class="text-4xl text-gray-700 mb-3" />
      <p class="text-gray-500">
        No assets in portfolio
      </p>
    </div>
  </div>
</template>`

<style scoped>
/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.group:hover .group-hover\:text-white {
  color: white;
}

.group:hover .group-hover\:text-red-500 {
  color: rgb(239 68 68);
}
</style>
