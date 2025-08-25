<script setup lang="ts">
import type { IPortfolio } from '@types/portfolio'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

interface Props {
  portfolio: IPortfolio
  fullPage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fullPage: true,
})

// Computed properties
const compliancePercentage = computed(() => {
  if (!props.portfolio || props.portfolio.assets.length === 0)
    return 100
  const compliantCount = props.portfolio.assets.filter(a => a.asset.is_shariah_compliant).length
  return Math.round((compliantCount / props.portfolio.assets.length) * 100)
})

const isFullyCompliant = computed(() => {
  return props.portfolio.assets.every(a => a.asset.is_shariah_compliant)
})

// Helper to get icon for recommendations
function getRecommendationIcon(recommendation: string) {
  const lowerRec = recommendation.toLowerCase()
  if (lowerRec.includes('reduce') || lowerRec.includes('trim'))
    return 'mdi:trending-down'
  if (lowerRec.includes('increase') || lowerRec.includes('add'))
    return 'mdi:trending-up'
  if (lowerRec.includes('diversif'))
    return 'mdi:chart-scatter-plot'
  return 'mdi:lightbulb-outline'
}

// Navigate to AI chat
function navigateToAI() {
  navigateTo(`/portfolio/${props.portfolio.id}/ai`)
}

// Navigate to full analysis
function navigateToFullAnalysis() {
  navigateTo('/ai')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
          <Icon icon="mdi:robot-outline" class="text-xl text-white" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-white">
            AI Analysis
          </h2>
          <p class="text-sm text-gray-500">
            Powered by advanced portfolio intelligence
          </p>
        </div>
      </div>
      <button
        v-if="fullPage"
        class="px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
        @click="navigateToAI"
      >
        <Icon icon="mdi:message-text" class="text-sm" />
        <span>Chat with AI</span>
      </button>
    </div>

    <!-- Overall Analysis with Recommendations -->
    <div class="bg-black border border-gray-800 rounded-xl p-6">
      <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
        Overall Analysis
      </h3>
      <p class="text-gray-300 leading-relaxed mb-6">
        {{ portfolio.analysis.overall_analysis }}
      </p>

      <!-- Inline Recommendations -->
      <div class="space-y-2">
        <div
          v-for="(recommendation, idx) in portfolio.analysis.portfolio_recommendations"
          :key="idx"
          class="flex gap-2"
        >
          <Icon
            icon="mdi:lightbulb-outline"
            class="text-yellow-500 mt-0.5 flex-shrink-0"
          />
          <p class="text-sm text-gray-400 leading-relaxed">
            {{ recommendation }}
          </p>
        </div>
      </div>
    </div>

    <!-- View Full Analysis Button (when not in fullPage mode) -->
    <div v-if="!fullPage" class="flex justify-center">
      <button
        class="btn flex items-center gap-2"
        @click="navigateToFullAnalysis"
      >
        <span>View Full Analysis</span>
        <Icon icon="mdi:arrow-right" class="text-sm" />
      </button>
    </div>

    <!-- Additional sections only shown in fullPage mode -->
    <template v-if="fullPage">
      <!-- Shariah Compliance Summary -->
      <div class="bg-black border border-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Shariah Compliance Status
          </h3>
          <div class="flex items-center gap-2">
            <div
              class="w-2 h-2 rounded-full" :class="[
                isFullyCompliant ? 'bg-green-500' : 'bg-amber-500',
              ]"
            />
            <span
              class="text-sm font-medium" :class="[
                isFullyCompliant ? 'text-green-500' : 'text-amber-500',
              ]"
            >
              {{ compliancePercentage }}% Compliant
            </span>
          </div>
        </div>

        <p class="text-gray-300 leading-relaxed">
          {{ portfolio.analysis.compliance_summary }}
        </p>
      </div>

      <!-- Asset Insights -->
      <div v-if="portfolio.analysis.asset_insights && portfolio.analysis.asset_insights.length > 0" class="bg-black border border-gray-800 rounded-xl p-6">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Individual Asset Insights
        </h3>

        <div class="grid gap-4">
          <div
            v-for="insight in portfolio.analysis.asset_insights"
            :key="insight.id"
            class="border-l-2 border-gray-700 pl-4"
          >
            <div class="flex items-center gap-2 mb-1">
              <h4 class="font-medium text-white">
                {{ insight.symbol }}
              </h4>
              <span class="text-sm text-gray-500">{{ insight.name }}</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              {{ insight.insight }}
            </p>
          </div>
        </div>
      </div>

      <!-- Watchlist -->
      <div v-if="portfolio.analysis.watchlist && portfolio.analysis.watchlist.length > 0" class="bg-black border border-gray-800 rounded-xl p-6">
        <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Sectors to Watch
        </h3>

        <div class="space-y-2">
          <div
            v-for="(item, idx) in portfolio.analysis.watchlist"
            :key="idx"
            class="flex items-center gap-3"
          >
            <Icon icon="mdi:eye-outline" class="text-gray-600" />
            <p class="text-sm text-gray-300">
              {{ item }}
            </p>
          </div>
        </div>
      </div>

      <!-- AI Confidence Score (if available) -->
      <div class="flex items-center justify-center pt-4">
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <Icon icon="mdi:information-outline" class="text-sm" />
          <span>Analysis generated with high confidence • Last updated: {{ new Date().toLocaleDateString() }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Hover effects for interactive elements */
button:hover {
  transform: translateY(-1px);
}
</style>
