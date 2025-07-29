<script setup lang="ts">
import type { IPortfolio, IPortfolioAsset } from '@/types/portfolio'
import { computed } from 'vue'

const { portfolio } = defineProps<{ portfolio: IPortfolio }>()

const nonCompliantAssets = computed<IPortfolioAsset[]>(() =>
  portfolio.assets.filter(a => !a.asset.is_shariah_compliant),
)

const nonCompliantCount = computed(() => nonCompliantAssets.value.length)
const totalAssets = computed(() => portfolio.assets.length)
const compliantCount = computed(() => totalAssets.value - nonCompliantCount.value)

const compliantPercentage = computed(() =>
  totalAssets.value === 0
    ? 0
    : Math.round((compliantCount.value / totalAssets.value) * 100),
)

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(value)
}
</script>

<template>
  <div class="bg-black border border-gray-800 rounded-xl p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-white text-lg font-semibold">
        Shariah Compliance Status
      </h2>
      <span
        class="bg-yellow-600 text-white text-xs font-medium px-3 py-1 rounded-full"
      >
        {{ nonCompliantCount }} Non-Compliant
      </span>
    </div>

    <!-- Compliance Percentage -->
    <div class="space-y-1">
      <div class="text-4xl font-bold text-white">
        {{ compliantPercentage }}%
      </div>
      <div class="text-sm text-gray-400">
        of assets are compliant
      </div>
    </div>

    <!-- Summary Text -->
    <p class="text-sm text-gray-500">
      {{ portfolio.analysis.compliance_summary }}
    </p>

    <!-- Non-Compliant Assets List -->
    <div class="space-y-3 pt-2 border-t border-gray-800">
      <template v-if="nonCompliantCount > 0">
        <div
          v-for="asset in nonCompliantAssets"
          :key="asset.asset.id"
          class="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-200"
        >
          <div class="flex items-center gap-3">
            <Icon
              icon="mdi:alert-circle-outline"
              class="text-red-500 text-base"
            />
            <div>
              <p class="text-sm font-medium text-white">
                {{ asset.asset.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ asset.asset.symbol }}
              </p>
            </div>
          </div>
          <p class="text-sm font-semibold text-red-500">
            {{
              formatCurrency(
                asset.units * parseFloat(asset.asset.latest_value),
                asset.asset.currency,
              )
            }}
          </p>
        </div>
      </template>
      <div
        v-else
        class="text-center py-8 text-gray-500"
      >
        All assets are Shariah-compliant
      </div>
    </div>
  </div>
</template>
