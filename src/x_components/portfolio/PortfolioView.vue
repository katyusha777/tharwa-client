<script setup lang="ts">
import type { TPortfolioAsset, TSentimentScore } from '@types'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { usePortfolioStore } from '~/stores/portfolio'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)

// Computed properties
const totalValueUSD = computed(() => {
  return activePortfolio.value?.totals?.USD || 0
})

const totalValueQAR = computed(() => {
  return activePortfolio.value?.totals?.QAR || 0
})

const nonCompliantAssets = computed(() => {
  if (!activePortfolio.value)
    return []
  return activePortfolio.value.assets.filter(a => !a.asset.is_shariah_compliant)
})

const isPortfolioCompliant = computed(() => {
  return nonCompliantAssets.value.length === 0
})

const compliancePercentage = computed(() => {
  if (!activePortfolio.value || activePortfolio.value.assets.length === 0)
    return 100
  const compliantCount = activePortfolio.value.assets.filter(a => a.asset.is_shariah_compliant).length
  return Math.round((compliantCount / activePortfolio.value.assets.length) * 100)
})

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

function getSentimentIcon(score: TSentimentScore) {
  switch (score) {
    case 1: return 'mdi:trending-up'
    case -1: return 'mdi:trending-down'
    default: return 'mdi:trending-neutral'
  }
}

function getSentimentColor(score: TSentimentScore) {
  switch (score) {
    case 1: return 'text-green-500'
    case -1: return 'text-red-500'
    default: return 'text-gray-500'
  }
}

function getSentimentBgColor(score: TSentimentScore) {
  switch (score) {
    case 1: return 'bg-green-50'
    case -1: return 'bg-red-50'
    default: return 'bg-gray-50'
  }
}

function getSentimentLabel(score: TSentimentScore) {
  switch (score) {
    case 1: return 'Positive'
    case -1: return 'Negative'
    default: return 'Neutral'
  }
}

function calculateAssetValue(asset: TPortfolioAsset) {
  const price = Number.parseFloat(asset.asset.latest_value)
  return price * asset.units
}

function navigateToAI() {
  // Navigate to AI chat
  navigateTo(`/portfolio/${activePortfolio.value?.id}/ai`)
}

onMounted(() => {
})
</script>

<template>
  <section v-if="activePortfolio" class="min-h-screen bg-black pb-20">
    <!-- Header with Portfolio Name -->
    <div class="px-4 py-6">
      <h1 class="text-2xl font-bold text-white">
        {{ activePortfolio.name }}
      </h1>
      <p class="text-gray-500 text-sm mt-1">
        Portfolio Overview
      </p>
    </div>

    <!-- Total Values Section -->
    <div class="px-4 pb-8">
      <div class="space-y-6">
        <div>
          <p class="text-gray-500 text-sm">
            Total Portfolio Value
          </p>
          <div class="flex items-baseline gap-3 mt-2">
            <h2 class="text-3xl font-bold text-white">
              {{ formatCurrency(totalValueUSD, 'USD') }}
            </h2>
            <span v-if="totalValueQAR > 0" class="text-gray-500 text-sm">
              + {{ formatCurrency(totalValueQAR, 'QAR') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Holdings -->
    <div class="px-4 pb-8">
      <h3 class="text-lg font-semibold text-white mb-4">
        Portfolio Holdings
      </h3>
      <AssetsList :assets="activePortfolio.assets" />
    </div>
  </section>

  <!-- Loading State -->
  <div v-else class="min-h-screen bg-black flex items-center justify-center">
    <div class="text-center">
      <Icon icon="mdi:loading" class="text-4xl text-gray-600 animate-spin" />
      <p class="mt-2 text-gray-400">
        Loading portfolio...
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #111;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* Remove default PrimeVue button styles that might interfere */
:deep(.p-button) {
  transition: all 0.2s ease;
}
</style>
