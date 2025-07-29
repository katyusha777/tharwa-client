import type { IBoxItem } from '~/@types/boxes'
import { defineStore } from 'pinia'

const GAMING_TERMS_KEY = 'gaming_terms_accepted'
const EXPIRY_DAYS = 7

function isExpired(timestamp: number): boolean {
  const now = Date.now()
  const expiryTime = EXPIRY_DAYS * 24 * 60 * 60 * 1000
  return now - timestamp > expiryTime
}

export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      isAuthOpen: false,
      isDepositOpen: false,
      isRulesOpen: false,
      isHigherLowerWorkOpen: false,
      isHigherLowerProvablyFairOpen: false,
      isKeyUnlockGuideOpen: false,
      isUpgraderWorkOpen: false,
      isUpgraderProvablyFairOpen: false,
      isUnboxingProvablyFairOpen: false,
      isPurchaseStatusModal: false,
      isWithdrawSteamInfoOpen: false,
      isEmailInputOpen: false,
      isSteamSaved: false,
      isGamingTermsOpen: false,
      isCaseBattleProvablyFairOpen: false,
      isItemPurchaseModal: false,
      isItemsChancesModal: false,
      boxItems: [] as IBoxItem[],
      boxId: '',
      isSkinsbackDepositOpen: false,
      skinsbackOrderId: null as string | null,
      isMarketplacePurchaseOpen: false,
      marketplaceOrderId: null as string | null,
    }
  },

  getters: {},

  actions: {
    async openAuthModal() { this.isAuthOpen = true },
    async closeAuthModal() { this.isAuthOpen = false },

    async openMarketplacePurchaseModal(orderId: string) {
      this.isMarketplacePurchaseOpen = true
      this.marketplaceOrderId = orderId
    },

    async closeMarketplacePurchaseModal() {
      this.isMarketplacePurchaseOpen = false
      this.marketplaceOrderId = null
    },

    async openSkinsbackDepositModal(orderId: string) {
      this.isSkinsbackDepositOpen = true
      this.skinsbackOrderId = orderId
    },

    async closeSkinsbackDepositModal() {
      this.isSkinsbackDepositOpen = false
      this.skinsbackOrderId = null
    },

    async openPurchaseStatusModal() { this.isPurchaseStatusModal = true },
    async closePurchaseStatusModal() { this.isPurchaseStatusModal = false },

    async openItemPurchaseModal() { this.isItemPurchaseModal = true },
    async closeItemPurchaseModal() { this.isItemPurchaseModal = false },

    async openItemsChancesModal() { this.isItemsChancesModal = true },
    async closeItemsChancesModal() { this.isItemsChancesModal = false },

    async openGamingTermsModal() {
      this.isGamingTermsOpen = true
    },

    async setBoxItems(boxes: IBoxItem[]) {
      this.boxItems = boxes
    },
    async setBoxId(id: string) {
      this.boxId = id
    },

    async closeGamingTermsModal() {
      this.isGamingTermsOpen = false
      localStorage.setItem(GAMING_TERMS_KEY, Date.now().toString())
    },

    async conditionallyOpenGamingTermsModal() {
      const stored = localStorage.getItem(GAMING_TERMS_KEY)
      if (!stored || isExpired(Number(stored))) {
        this.isGamingTermsOpen = true
      }
    },

    async openRulesModal() { this.isRulesOpen = true },
    async closeRulesModal() { this.isRulesOpen = false },

    async openHigherLowerWorkModal() { this.isHigherLowerWorkOpen = true },
    async closeHigherLowerWorkModal() { this.isHigherLowerWorkOpen = false },

    async openHigherLowerProvablyFairModal() { this.isHigherLowerProvablyFairOpen = true },
    async closeHigherLowerProvablyFairModal() { this.isHigherLowerProvablyFairOpen = false },

    async openKeyUnlockGuideModal() { this.isKeyUnlockGuideOpen = true },
    async closeKeyUnlockGuideModal() { this.isKeyUnlockGuideOpen = false },

    async openUpgraderWorkModal() { this.isUpgraderWorkOpen = true },
    async closeUpgraderWorkModal() { this.isUpgraderWorkOpen = false },

    async openUpgraderProvablyFairModal() { this.isUpgraderProvablyFairOpen = true },
    async closeUpgraderProvablyFairModal() { this.isUpgraderProvablyFairOpen = false },

    async openCaseBattleProvablyFairModal() { this.isCaseBattleProvablyFairOpen = true },
    async closeCaseBattleProvablyFairModal() { this.isCaseBattleProvablyFairOpen = false },

    async openUnboxingProvablyFairModal() { this.isUnboxingProvablyFairOpen = true },
    async closeUnboxingProvablyFairModal() { this.isUnboxingProvablyFairOpen = false },

    async openEmailInputModal() { this.isEmailInputOpen = true },
    async closeEmailInputModal() { this.isEmailInputOpen = false },

    async openSteamInfoModal() { this.isWithdrawSteamInfoOpen = true },
    async closeSteamInfoModal() { this.isWithdrawSteamInfoOpen = false },

    async saveSteam() { this.isSteamSaved = true },
  },
})
