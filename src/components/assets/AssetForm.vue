<script setup lang="ts">
import type { IAsset, TAssetType } from '@types'
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  assetId?: string
}

interface Emits {
  (e: 'back'): void
  (e: 'submit', data: any): void
  (e: 'delete', assetId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Reactive data
const formRef = ref()
const loading = ref(false)
const deleteLoading = ref(false)
const existingAsset = ref<IAsset | null>(null)

// Form data
const formData = ref({
  assetType: '' as TAssetType | '',
  ticker: '',
  selectedCommodity: [] as string[],
  units: '',
  exchange: '',
})

// Computed properties
const isEditMode = computed(() => !!props.assetId)

const commodityOptions = [
  { text: 'Gold', value: 'gold' },
  { text: 'Silver', value: 'silver' },
]

const unitsLabel = computed(() => {
  if (!formData.value.assetType)
    return 'Units'

  const unitMap = {
    stock: 'Shares',
    fund: 'Shares',
    commodity: 'Ounces',
    crypto: 'Coins',
  }

  return `${unitMap[formData.value.assetType as TAssetType]} (${capitalizeFirst(unitMap[formData.value.assetType as TAssetType])})`
})

// Validation rules
const tickerRules = [
  { required: true, message: 'Please enter ticker symbol' },
  { pattern: /^[A-Z0-9.]+$/i, message: 'Invalid ticker format' },
]

const unitsRules = [
  { required: true, message: 'Please enter units' },
  { pattern: /^(?:\d+(?:\.\d+)?|\.\d+)$/, message: 'Must be a valid number' },
  { validator: (val: string) => Number.parseFloat(val) > 0, message: 'Must be greater than 0' },
]

// Methods
function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function loadAsset(assetId: string) {
  try {
    // Mock API call - replace with your actual API
    console.log('Loading asset:', assetId)

    // Simulated asset data for demo
    const mockAsset: IAsset = {
      id: assetId,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      asset_type: 'stock',
      exchange: 'NASDAQ',
      is_shariah_compliant: true,
      zoya_compliance_data: {
        isCompliant: true,
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        status: 'compliant',
      },
      created_at: '2025-07-14 22:53:47.813',
      updated_at: null,
      currency: 'USD',
      latest_value: '150.25',
      exchange_country: 'US',
      sentiment_analysis: 'Positive outlook',
      sentiment_score: 1,
      last_sentiment_update: '2025-07-29T00:00:00Z',
      last_shariah_check: '2025-07-29T00:00:00Z',
    }

    existingAsset.value = mockAsset

    // Pre-populate form for edit mode
    formData.value = {
      assetType: mockAsset.asset_type,
      ticker: mockAsset.symbol,
      selectedCommodity: mockAsset.asset_type === 'commodity' ? [mockAsset.name.toLowerCase()] : [],
      units: '10', // This would come from portfolio asset data
      exchange: mockAsset.exchange || '',
    }
  }
  catch (error) {
    console.error('Error loading asset:', error)
  }
}

function onCommodityChange(value: string[]) {
  formData.value.selectedCommodity = value
}

async function onSubmit() {
  try {
    loading.value = true

    const submitData = {
      assetType: formData.value.assetType,
      ticker: formData.value.ticker,
      commodity: formData.value.selectedCommodity[0],
      units: Number.parseFloat(formData.value.units),
      exchange: formData.value.exchange,
      isEdit: isEditMode.value,
      assetId: props.assetId,
    }

    console.log('Form submitted:', submitData)
    emit('submit', submitData)
  }
  catch (error) {
    console.error('Submit error:', error)
  }
  finally {
    loading.value = false
  }
}

async function onDelete() {
  try {
    deleteLoading.value = true

    if (props.assetId) {
      console.log('Deleting asset:', props.assetId)
      emit('delete', props.assetId)
    }
  }
  catch (error) {
    console.error('Delete error:', error)
  }
  finally {
    deleteLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  if (props.assetId) {
    loadAsset(props.assetId)
  }
})

// Watch for assetId changes
watch(() => props.assetId, (newAssetId) => {
  if (newAssetId) {
    loadAsset(newAssetId)
  }
  else {
    // Reset form for create mode
    existingAsset.value = null
    formData.value = {
      assetType: '',
      ticker: '',
      selectedCommodity: [],
      units: '',
      exchange: '',
    }
  }
})
</script>

<template>
  <div class="asset-form">
    <van-nav-bar
      :title="isEditMode ? 'Edit Asset' : 'Add Asset'"
      left-arrow
      @click-left="$emit('back')"
    />

    <van-form ref="formRef" class="form-container" @submit="onSubmit">
      <!-- Asset Type Selection (only in create mode) -->
      <van-field
        v-if="!isEditMode"
        name="assetType"
        label="Asset Type"
        :rules="[{ required: true, message: 'Please select asset type' }]"
      >
        <template #input>
          <van-radio-group v-model="formData.assetType" direction="horizontal">
            <van-radio name="stock">
              Stock
            </van-radio>
            <van-radio name="fund">
              Fund
            </van-radio>
            <van-radio name="crypto">
              Crypto
            </van-radio>
            <van-radio name="commodity">
              Commodity
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- Asset Type Display (edit mode) -->
      <van-field
        v-if="isEditMode && existingAsset"
        label="Asset Type"
        :value="capitalizeFirst(existingAsset.asset_type)"
        readonly
      />

      <!-- Stock/Fund Ticker Input -->
      <van-field
        v-if="formData.assetType === 'stock' || formData.assetType === 'fund'"
        v-model="formData.ticker"
        name="ticker"
        :label="formData.assetType === 'stock' ? 'Stock Ticker' : 'Fund Ticker'"
        placeholder="e.g., AAPL, SPY"
        :rules="tickerRules"
        :readonly="isEditMode"
      />

      <!-- Crypto Ticker Input -->
      <van-field
        v-if="formData.assetType === 'crypto'"
        v-model="formData.ticker"
        name="ticker"
        label="Crypto Symbol"
        placeholder="e.g., BTC, ETH"
        :rules="tickerRules"
        :readonly="isEditMode"
      />

      <!-- Commodity Selection -->
      <van-field
        v-if="formData.assetType === 'commodity'"
        name="commodity"
        label="Commodity"
        :rules="[{ required: true, message: 'Please select a commodity' }]"
        :readonly="isEditMode"
      >
        <template #input>
          <van-picker
            v-if="!isEditMode"
            v-model="formData.selectedCommodity"
            :columns="commodityOptions"
            @change="onCommodityChange"
          />
          <span v-else class="readonly-value">
            {{ existingAsset?.name }}
          </span>
        </template>
      </van-field>

      <!-- Asset Name (for display in edit mode) -->
      <van-field
        v-if="isEditMode && existingAsset"
        label="Asset Name"
        :value="existingAsset.name"
        readonly
      />

      <!-- Units Input -->
      <van-field
        v-model="formData.units"
        name="units"
        :label="unitsLabel"
        placeholder="Enter amount"
        type="number"
        :rules="unitsRules"
      />

      <!-- Exchange (optional, for stocks/funds) -->
      <van-field
        v-if="(formData.assetType === 'stock' || formData.assetType === 'fund') && !isEditMode"
        v-model="formData.exchange"
        name="exchange"
        label="Exchange (Optional)"
        placeholder="e.g., NASDAQ, NYSE"
      />

      <!-- Form Actions -->
      <div class="form-actions">
        <van-button
          type="primary"
          native-type="submit"
          block
          :loading="loading"
          class="submit-btn"
        >
          {{ isEditMode ? 'Update Asset' : 'Add Asset' }}
        </van-button>

        <van-button
          v-if="isEditMode"
          type="danger"
          block
          :loading="deleteLoading"
          class="delete-btn"
          @click="onDelete"
        >
          Delete Asset
        </van-button>
      </div>
    </van-form>
  </div>
</template>
