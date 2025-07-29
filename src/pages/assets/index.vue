<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '~/stores/portfolio'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)
</script>

<template>
  <div>Assets</div>
  <template v-if="activePortfolio">
    <AssetsList :assets="activePortfolio.assets" />
  </template>
  <div><a href="/assets/add">New asset</a></div>
</template>
