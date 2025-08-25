import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      isPortfolioAssetFormOpen: false,
      portfolioAssetFormAssetId: null as string | null,
    }
  },

  getters: {},

  actions: {
    async openAssetForm(assetId: string | null | undefined = null) {
      this.isPortfolioAssetFormOpen = true
      this.portfolioAssetFormAssetId = assetId
    },

    async closeMarketplacePurchaseModal() {
      this.isPortfolioAssetFormOpen = false
      this.portfolioAssetFormAssetId = null
    },
  },
})
