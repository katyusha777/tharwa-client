import type { IPortfolio } from '~/@types/portfolio'
import PortfolioAdapter from '@adapters/PortfolioAdapter'
import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => {
    return {
      activePortfolio: null as IPortfolio | null,
    }
  },

  actions: {
    async loadDefault(): Promise<void> {
      this.activePortfolio = await PortfolioAdapter.getDefaultPortfolio()
    },
  },
})
