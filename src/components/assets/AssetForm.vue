<script setup lang="ts">
import { ref } from 'vue'
import { assetTypes, commodities } from '~/consts/assetsConsts'

const commodity = ref()
const assetType = ref()
const amount = ref(12)

const showBottom = ref(false)
</script>

<template>
  <van-action-sheet v-model:show="showBottom" title="Update asset">
    <section class="flex flex-col gap-4 pt-6 pb-10 px-8">
      <SelectComponent v-model="assetType" label="Asset type" :options="assetTypes" />
      <SelectComponent v-model="commodity" label="Commodity" :options="commodities" />
      <NumberInputComponent v-model="amount" label="Amount" />
      <ButtonComponent label="Save" />
    </section>
  </van-action-sheet>

  <ButtonComponent label="Open" @click="() => showBottom = true " />
</template>
