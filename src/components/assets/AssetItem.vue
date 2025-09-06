<script setup lang="ts">
import type { TPortfolioAsset } from '@types'
import type { ICommodity, ICrypto, IRealEstate, IStock, TAssetType } from '~/@types/assets'
import { assetTypeTitle } from '@helpers/assetHelper'
import { formatCurrency } from '@helpers/numberHelper'
import Chip from 'primevue/chip'
import AssetItemKeyVal from '~/components/assets/partials/AssetItemKeyVal.vue'

const props = defineProps<{
  portfolioAsset: TPortfolioAsset
}>()

const asset: IStock | IRealEstate | ICrypto | ICommodity = props.portfolioAsset.asset
const type: TAssetType = props.portfolioAsset.type
const title = props.portfolioAsset.type === 'real_estate' ? 'Real Estate' : asset.symbol
const subtitle = props.portfolioAsset.type === 'real_estate' ? asset.address : asset.name
</script>

<template>
  <article
    class="asset-item bg-black border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-200"
  >
    <!-- Main Content -->
    <div class="p-4">
      <!-- Header Row -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <div class="flex justify-between gap-3">
            <div class="flex justify-start">
              <h3 class="font-semibold text-white text-lg mr-4">
                {{ title }}
              </h3>
              <BadgeComponent v-if="type === 'stock'" class="mr-4" :title="true ? 'Halal' : 'Non-Halal'" :kind="true ? 'success' : 'fail'" />
              <SentimentScore v-if="type !== 'real_estate'" :sentiment="asset.sentiment_score" />
            </div>
            <Chip :class="type" :label="assetTypeTitle(type)" />
          </div>
          <p class="text-sm text-gray-500 mt-0.5">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-3 gap-4 mb-3">
        <template v-if="type !== 'real_estate'">
          <AssetItemKeyVal title="Price" :value="formatCurrency(asset.latest_value, asset.currency)" />
          <AssetItemKeyVal title="Units" :value="portfolioAsset.units" />
        </template>
        <AssetItemKeyVal title="Value" :value="formatCurrency(portfolioAsset.value.value, portfolioAsset.value.currency)" />
      </div>

      <footer class="mt-5">
        <!-- Action Buttons -->
        <slot name="actions" />
      </footer>
    </div>
  </article>
</template>

<style>
article.asset-item {
  background: var(--card-bg);
  border-top:1px solid rgb(255 255 255 / 6%);

  .p-chip {
    padding: 2px 8px;
    font-size: 14px;
    text-transform: uppercase;
  }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
