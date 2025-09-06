<script setup lang="ts">
import type { TPortfolioAsset } from '@types'
import type { ICommodity, ICrypto, IRealEstate, IStock, TAssetType } from '~/@types/assets'
import PortfolioAssetAdapter from '@adapters/PortfolioAssetAdapter'
import { formatCurrency } from '@helpers/numberHelper'
import ToggleSwitch from 'primevue/toggleswitch'
import { defineEmits, defineProps, ref } from 'vue'
import SubtitleComponent from '~/components/elements/SubtitleComponent.vue'

const props = defineProps<{
  isOpen: boolean
  id: string | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'closed'): void
}>()

const shariahCompliant = true

const isWatching = ref(false)
const showBottom = ref(false)
const portfolioAsset = ref<TPortfolioAsset | null>(null)
const asset = ref<IStock | IRealEstate | ICrypto | ICommodity | null>(null)
const type = ref<TAssetType | null>(null)
const title = ref<string>('')
const subtitle = ref<string>('')
const isLoading = ref(false)

async function loadAsset() {
  if (!props.id)
    return

  isLoading.value = true
  const _asset = await PortfolioAssetAdapter.getAsset(props.id)
  portfolioAsset.value = _asset
  asset.value = _asset.asset
  type.value = _asset.type

  if (_asset.asset_type === 'real_estate') {
    title.value = 'Real Estate'
    subtitle.value = _asset.asset.address ?? ''
  }
  else {
    title.value = _asset.asset.symbol
    subtitle.value = _asset.asset.name
  }

  isLoading.value = false
}

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

function resetForm() {
  console.log('resetForm')
}

function formClosed() {
  console.log('formClosed')
}

// Watch for internal state changes
watch(showBottom, (val) => {
  emit('update:isOpen', val)
  if (!val) {
    emit('closed')
  }
})
</script>

<template>
  <van-action-sheet v-model:show="showBottom" :title="isLoading ? '...' : title" @closed="formClosed">
    <Loader v-if="isLoading || !portfolioAsset || !asset || !id" />
    <section v-else class="px-12">
      <header class="flex justify-between items-center mb-10">
        <div>
          <TitleComponent :title="title" :no-margin="true">
            <BadgeComponent v-if="type === 'stock'" class="mr-4" :title="shariahCompliant ? 'Halal' : 'Non-Halal'" :kind="shariahCompliant ? 'success' : 'fail'" :row-reverse="true" />
          </TitleComponent>

          <p class="text-sm text-gray-200">
            {{ subtitle }}
          </p>
        </div>
        <div class="flex justify-end">
          <SubtitleComponent title="Watching" class="mr-2" />
          <ToggleSwitch v-model="isWatching" />
        </div>
      </header>

      <section class="mb-12 flex justify-between text-white">
        <template v-if="portfolioAsset.asset_type !== 'real_estate'">
          <KeyVal title="Current price" :value="formatCurrency(portfolioAsset.asset.latest_value, portfolioAsset.asset.currency)" />
          <KeyVal title="Units" :value="portfolioAsset.units" />
        </template>
        <KeyVal title="Value" :value="formatCurrency(portfolioAsset.value.value, portfolioAsset.value.currency)" />

        <KeyVal v-if="portfolioAsset.asset_type !== 'real_estate'" title="Sentiment">
          <SentimentScore :sentiment="portfolioAsset.asset.sentiment_score" />
        </KeyVal>
      </section>

      <section class="text-white">
        <SubtitleComponent title="AI Analysis" class="mb-4 text-white" />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nulla a sapien hendrerit feugiat sit amet porta felis. Nam feugiat, augue sed mattis maximus, massa erat sollicitudin felis, ac porta tortor orci sed massa. Integer maximus lobortis augue ut auctor. Fusce ut tellus accumsan, viverra turpis eget, euismod ante. Etiam sed convallis nisi. Proin sed pharetra nisl, a scelerisque quam. Curabitur in diam nisl. Vestibulum sem diam, auctor eget egestas posuere, aliquet rhoncus eros. Proin non lectus nec risus malesuada blandit. Ut efficitur sodales quam at consectetur. Vestibulum euismod sapien sed ornare lobortis. Curabitur enim diam, vestibulum a felis quis, tempor faucibus libero.</p>
      </section>
    </section>
  </van-action-sheet>
</template>
