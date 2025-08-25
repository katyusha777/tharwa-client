<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '~/stores/portfolio'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)

const modalStore = useModalStore()
function newAsset() {
  modalStore.openAssetForm()
}
</script>

<template>
  <div>Assets</div>
  <button @click="newAsset">
    New
  </button>
  <template v-if="activePortfolio">
    <AssetsList :assets="activePortfolio.assets" />
  </template>
</template>
