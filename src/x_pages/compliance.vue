<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '~/stores/portfolio'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)
</script>

<template>
  <template v-if="activePortfolio">
    <PortfolioCompliance :portfolio="activePortfolio" />
  </template>
</template>
