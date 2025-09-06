<script setup lang="ts">
import { storeToRefs } from 'pinia'

const portfolioStore = usePortfolioStore()
const { activePortfolio } = storeToRefs(portfolioStore)

const isFormOpen = ref(false)
const formEditId = ref<string | null>(null)
const isViewOpen = ref(false)
const viewId = ref<string | null>(null)

function openPortfolioForm() {
  formEditId.value = null
  isFormOpen.value = true
}

function editAsset(id: string) {
  formEditId.value = id
  isFormOpen.value = true
}

function viewAsset(id: string) {
  console.log('VIEW asset')
  viewId.value = id
  isViewOpen.value = true
}

function viewClosed() {
  viewId.value = null
  isViewOpen.value = false
}

function assetFormClosed() {
  formEditId.value = null
  isFormOpen.value = false
}

function deleteAsset(id: string) {
  alert(`DELETE: ${id}`)
}
</script>

<template>
  <section v-if="activePortfolio">
    <TitleComponent title="My Portfolio" :action-button="{ title: 'Add asset', action: openPortfolioForm }" />
    <NetWorth :value="activePortfolio.total" />

    <template v-if="false">
      <TitleComponent title="Asset distribution" />
      <PortfolioAssetComposition :total-value="activePortfolio.total.value" :totals="activePortfolio.grouped_totals" />
    </template>

    <TitleComponent title="Assets" class="mt-8" />
    <AssetsList v-if="activePortfolio" :assets="activePortfolio.assets">
      <template #actions="{ asset }">
        <footer class="flex justify-start">
          <van-button class="text-button mr-6" @click="viewAsset(asset.id)">
            View
          </van-button>
          <van-button class="text-button" @click="editAsset(asset.id)">
            Edit
          </van-button>
        </footer>
      </template>
    </AssetsList>

    <AssetForm :id="formEditId" :is-open="isFormOpen" @closed="assetFormClosed" />
    <PortfolioAssetView :id="viewId" :is-open="isViewOpen" @closed="viewClosed" />
  </section>
</template>
