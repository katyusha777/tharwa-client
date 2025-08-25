<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import AssetForm from '~/components/assets/AssetForm.vue'
import { useModalStore } from '~/stores/modal'

const showAssetForm = ref(false)
const modalStore = useModalStore()

const { portfolioAssetFormAssetId } = storeToRefs(modalStore)

function assetFormClosed() {
  modalStore.closeMarketplacePurchaseModal()
}

watch(() => modalStore.isPortfolioAssetFormOpen, val => showAssetForm.value = val)
</script>

<template>
  <van-popup
    v-model:show="showAssetForm"
    closeable
    round
    close-icon="close"
    position="bottom"
    :style="{ height: '80vh' }"
    @closed="assetFormClosed"
  >
    <AssetForm :asset-id="portfolioAssetFormAssetId" />
  </van-popup>
</template>
