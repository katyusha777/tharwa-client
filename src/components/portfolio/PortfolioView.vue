<script setup lang="ts">
import type { IPortfolioAsset, TSentimentScore } from '@types'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
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

function calculateAssetValue(asset: IPortfolioAsset) {
  const price = Number.parseFloat(asset.asset.latest_value)
  return price * asset.units
}

function navigateToAI() {
  // Navigate to AI chat
  navigateTo(`/portfolio/${activePortfolio.value?.id}/ai`)
}

onMounted(() => {
  portfolioStore.loadDefault()
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

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-900 rounded-xl p-4">
            <p class="text-xs text-gray-500 uppercase">
              Total Assets
            </p>
            <p class="text-2xl font-bold text-white mt-1">
              {{ activePortfolio.assets.length }}
            </p>
          </div>
          <div class="bg-gray-900 rounded-xl p-4">
            <p class="text-xs text-gray-500 uppercase">
              Compliance
            </p>
            <p class="text-2xl font-bold text-white mt-1">
              {{ compliancePercentage }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Analysis Section -->
    <div class="px-4 pb-8">
      <div class="bg-gray-900 rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Icon icon="mdi:robot-outline" class="text-xl text-purple-400" />
            </div>
            <h3 class="text-lg font-semibold text-white">
              AI Analysis
            </h3>
          </div>
          <Button
            label="Chat with AI"
            size="small"
            class="bg-emerald-500 border-0 hover:bg-emerald-600 text-black font-medium px-4 py-2 rounded-xl"
            @click="navigateToAI"
          />
        </div>

        <div class="space-y-6">
          <!-- Overall Analysis -->
          <div>
            <p class="text-sm text-gray-400 leading-relaxed">
              {{ activePortfolio.analysis.overall_analysis }}
            </p>
          </div>

          <!-- Recommendations -->
          <div class="space-y-3">
            <div
              v-for="(rec, idx) in activePortfolio.analysis.portfolio_recommendations"
              :key="idx"
              class="flex gap-3"
            >
              <Icon icon="mdi:lightbulb-outline" class="text-yellow-500 mt-0.5 flex-shrink-0" />
              <p class="text-sm text-gray-400 leading-relaxed">
                {{ rec }}
              </p>
            </div>
          </div>

          <!-- Compliance Summary -->
          <div class="bg-gray-800/50 rounded-xl p-4 mt-4">
            <h4 class="font-medium text-white mb-2">
              Shariah Compliance Summary
            </h4>
            <p class="text-sm text-gray-400 leading-relaxed">
              {{ activePortfolio.analysis.compliance_summary }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Shariah Compliance Section -->
    <div class="px-4 pb-8">
      <div class="bg-gray-900 rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">
            Shariah Compliance<br>Status
          </h3>
          <div
            class="px-3 py-1.5 rounded-full text-xs font-medium" :class="[
              isPortfolioCompliant
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400',
            ]"
          >
            {{ isPortfolioCompliant ? '✓ Compliant' : `${nonCompliantAssets.length} Non-Compliant` }}
          </div>
        </div>

        <!-- Compliance Overview -->
        <div class="mb-6">
          <div class="flex items-center gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-white">
                {{ compliancePercentage }}%
              </div>
              <p class="text-xs text-gray-500 mt-1">
                of assets are compliant
              </p>
            </div>
          </div>
        </div>

        <!-- Non-Compliant Assets List -->
        <div v-if="nonCompliantAssets.length > 0" class="space-y-3">
          <div
            v-for="asset in nonCompliantAssets"
            :key="asset.id"
            class="bg-gray-800/50 rounded-xl p-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:alert" class="text-red-400 text-sm" />
                </div>
                <div>
                  <p class="text-sm font-medium text-white">
                    {{ asset.asset.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ asset.asset.symbol }}
                  </p>
                </div>
              </div>
              <span class="text-sm text-red-400 font-medium">
                {{ formatCurrency(calculateAssetValue(asset), asset.asset.currency) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Holdings -->
    <div class="px-4 pb-8">
      <h3 class="text-lg font-semibold text-white mb-4">
        Portfolio Holdings
      </h3>

      <div class="space-y-3">
        <div
          v-for="asset in activePortfolio.assets"
          :key="asset.id"
          class="bg-gray-900 rounded-xl p-4"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <p class="font-semibold text-white">
                    {{ asset.asset.symbol }}
                  </p>
                  <span class="text-xs text-gray-500">{{ asset.asset.name }}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  {{ asset.units }} units
                </p>
              </div>
            </div>

            <div class="text-right">
              <p class="font-semibold text-white">
                {{ formatCurrency(calculateAssetValue(asset), asset.asset.currency) }}
              </p>
              <p class="text-xs text-gray-500">
                @ {{ formatCurrency(asset.asset.latest_value, asset.asset.currency) }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-gray-800">
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Sentiment</span>
              <div
                class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs" :class="[
                  asset.asset.sentiment_score === 1 ? 'bg-emerald-500/20 text-emerald-400'
                  : asset.asset.sentiment_score === -1 ? 'bg-red-500/20 text-red-400'
                    : 'bg-gray-700 text-gray-400',
                ]"
              >
                <Icon
                  :icon="getSentimentIcon(asset.asset.sentiment_score)"
                  class="text-sm"
                />
                <span>{{ getSentimentLabel(asset.asset.sentiment_score) }}</span>
              </div>
            </div>

            <div
              class="px-3 py-1 rounded-full text-xs font-medium" :class="[
                asset.asset.is_shariah_compliant
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400',
              ]"
            >
              {{ asset.asset.is_shariah_compliant ? '✓ Shariah' : '✗ Non-Shariah' }}
            </div>
          </div>
        </div>
      </div>
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
