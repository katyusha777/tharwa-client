<script setup lang="ts">
import { storeToRefs } from 'pinia'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)

const isItemOpen = ref(false)
</script>

<template>
  <section v-if="activePortfolio">
    <NetWorth :value="activePortfolio.total" />
    <PortfolioAssetView id="6cc94be7-d754-469f-8ce3-733edc015c09" :is-open="isItemOpen" @closed="() => isItemOpen = false" />

    <button @click="() => isItemOpen = true">
      OPEN
    </button>
    <AssetSearchHeader />
    <ButtonComponent label="Test" />
    <TitleComponent title="Wishlist" />
    <AssetsList :assets="activePortfolio.assets" />
  </section>
</template>
