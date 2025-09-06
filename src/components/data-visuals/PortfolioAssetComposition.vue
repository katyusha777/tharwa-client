<script setup lang="ts">
import type { TAssetType } from '~/@types/assets'
import type { TMonetaryValue } from '~/@types/money'
import Card from 'primevue/card'
import MeterGroup from 'primevue/metergroup'
import { ref } from 'vue'
import { assetIcon } from '~/consts/icons.js'

const props = defineProps<{
  totalValue: number
  totals: Record<TAssetType, TMonetaryValue>
}>()

const value = ref([
  {
    label: 'Real Estate',
    color1: '#34d399',
    color2: '#fbbf24',
    value: Number.parseInt(((props.totals.real_estate.value / props.totalValue) * 100).toString()),
    icon: assetIcon.realEstate,
  },
  {
    label: 'Commodities',
    color1: '#fbbf24',
    color2: '#60a5fa',
    value: Number.parseInt(((props.totals.commodity.value / props.totalValue) * 100).toString()),
    icon: assetIcon.commodity,
  },
  {
    label: 'Stocks',
    color1: '#60a5fa',
    color2: '#c084fc',
    value: Number.parseInt(((props.totals.stock.value / props.totalValue) * 100).toString()),
    icon: assetIcon.stock,
  },
  {
    label: 'Crypto',
    color1: '#c084fc',
    color2: '#c084fc',
    value: Number.parseInt(((props.totals.crypto.value / props.totalValue) * 100).toString()),
    icon: assetIcon.crypto,
  },
])
</script>

<template>
  <div class="card">
    <MeterGroup :value="value" label-position="start">
      <template #label="{ value }">
        <div class="flex flex-wrap gap-4">
          <template v-for="val of value" :key="val.label">
            <Card class="flex-1 border border-surface shadow-none">
              <template #content>
                <div class="flex justify-between gap-8">
                  <div class="flex flex-col gap-1">
                    <span class="text-surface-500 dark:text-surface-400 text-sm">{{ val.label }}</span>
                    <span class="font-bold text-lg">{{ val.value }}%</span>
                  </div>
                  <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" :style="{ backgroundColor: `${val.color1}`, color: '#ffffff' }">
                    <i :class="val.icon" />
                  </span>
                </div>
              </template>
            </Card>
          </template>
        </div>
      </template>
      <template #meter="slotProps">
        <span :class="slotProps.class" :style="{ background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`, width: slotProps.size }" />
      </template>
    </MeterGroup>
  </div>
</template>
