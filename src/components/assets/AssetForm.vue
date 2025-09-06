<script setup lang="ts">
import type { TAssetFormDTO, TAssetType, TCurrency } from '~/@types/assets'
import PortfolioAssetAdapter from '@adapters/PortfolioAssetAdapter'
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { assetTypes, commodities } from '~/consts/assetsConsts'
import { currencies } from '~/consts/financialConsts'

const props = defineProps<{
  isOpen: boolean
  id?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'closed'): void
  (e: 'save', data: TAssetFormDTO): void
}>()

// Form state
const showBottom = ref(false)
const assetType = ref<TAssetType>()
const currency = ref<TCurrency>('USD')
const address = ref('')
const assetId = ref<string | null>(null) // The actual asset itself
const value = ref(0)
const symbol = ref('')
const units = ref(0)
const selectedCommodity = ref('')
const isLoading = ref(false)

// Reset form
function resetForm() {
  assetType.value = undefined
  address.value = ''
  value.value = 0
  symbol.value = ''
  currency.value = 'USD'
  units.value = 0
  selectedCommodity.value = ''
}

async function loadAsset() {
  if (!props.id)
    return

  isLoading.value = true
  const asset = await PortfolioAssetAdapter.getAsset(props.id)

  assetType.value = asset.type

  if (asset.type === 'real_estate') {
    address.value = asset.asset.address
    value.value = asset.asset.value
    currency.value = asset.asset.currency
    assetId.value = asset.asset.id
  }
  else {
    symbol.value = asset.asset.symbol
    units.value = asset.units
    selectedCommodity.value = asset.asset.symbol
  }
  isLoading.value = false
}

// Watch for commodity selection to map to symbol
watch(selectedCommodity, (val) => {
  if (assetType.value === 'commodity' && val) {
    symbol.value = val
  }
})

// Watch for isOpen prop changes
watch(() => props.isOpen, (val) => {
  showBottom.value = val
  if (val && props.id) {
    loadAsset()
  }
  else if (val) {
    resetForm()
  }
})

// Watch for internal state changes
watch(showBottom, (val) => {
  emit('update:isOpen', val)
  if (!val) {
    emit('closed')
  }
})

// Build form data object
function buildFormData(): TAssetFormDTO | null {
  if (!assetType.value)
    return null

  const baseData = {
    asset_type: assetType.value,
  }

  if (assetType.value === 'real_estate') {
    return { ...baseData, asset_type: 'real_estate', address: address.value, value: value.value, currency: currency.value }
  }

  // All other types use symbol and units
  return {
    ...baseData,
    asset_type: assetType.value,
    symbol: assetType.value === 'commodity' ? (selectedCommodity.value || symbol.value) : symbol.value,
    units: units.value,
  } as TAssetFormDTO
}

// Save handler
function handleSave() {
  const formData = buildFormData()
  if (!formData)
    return

  if (assetId.value)
    PortfolioAssetAdapter.updateAsset(assetId.value, formData)
  else
    PortfolioAssetAdapter.createAsset(formData)

  if (formData) {
    emit('save', formData)
    // showBottom.value = false
  }
}

function formClosed() {
  console.log('closed')
}

// Computed property for validation
const isFormValid = computed(() => {
  if (!assetType.value)
    return false

  switch (assetType.value) {
    case 'real_estate':
      return address.value.trim() !== '' && value.value > 0
    case 'crypto':
    case 'stock':
      return symbol.value.trim() !== '' && units.value > 0
    case 'commodity':
      return (selectedCommodity.value !== '' || symbol.value.trim() !== '') && units.value > 0
    default:
      return false
  }
})
</script>

<template>
  <van-action-sheet v-model:show="showBottom" :title="id ? 'Update asset' : 'Add asset'" @closed="formClosed">
    <Loader v-if="isLoading" />
    <section v-else class="flex flex-col gap-4 pt-6 pb-10 px-8">
      <!-- Asset Type Selection -->
      <SelectComponent v-if="!id" v-model="assetType" label="Asset type" :options="assetTypes" />

      <!-- Dynamic Fields Based on Asset Type -->
      <template v-if="assetType">
        <!-- Real Estate Fields -->
        <template v-if="assetType === 'real_estate'">
          <InputComponent v-model="address" label="Address" placeholder="Enter property address" />
          <SelectComponent v-model="currency" label="Currency" :options="currencies" />
          <NumberInputComponent v-model="value" label="Property Value ($)" :min="0" />
        </template>

        <!-- Commodity Fields -->
        <template v-else-if="assetType === 'commodity'">
          <SelectComponent v-model="selectedCommodity" label="Commodity" :options="commodities" />
          <NumberInputComponent v-model="units" label="Units" :min="0" :step="0.01" />
        </template>

        <!-- Crypto & Stock Fields -->
        <template v-else>
          <InputComponent v-model="symbol" :label="assetType === 'crypto' ? 'Crypto Symbol' : 'Stock Symbol'" :placeholder="assetType === 'crypto' ? 'e.g., BTC, ETH' : 'e.g., AAPL, GOOGL'" />
          <NumberInputComponent v-model="units" :label="assetType === 'crypto' ? 'Amount' : 'Shares'" :min="0" :step="assetType === 'crypto' ? 0.00000001 : 0.01" />
        </template>
      </template>

      <!-- Save Button -->
      <ButtonComponent label="Save" :disabled="!isFormValid" @click="handleSave" />
    </section>
  </van-action-sheet>
</template>
