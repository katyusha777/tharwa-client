<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '~/stores/portfolio'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)
</script>

<template>
  <AppHeader />
  <NetWorth />
  <AssetView />
  <AssetSearchHeader />
  <AssetForm />
  <PortfolioAssetComposition />
  <ButtonComponent label="Test" />
  <TitleComponent title="Wishlist" />
  <AssetsList v-if="activePortfolio" :assets="activePortfolio.assets" />
</template>
