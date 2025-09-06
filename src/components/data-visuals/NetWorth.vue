<script setup lang="ts">
import type { TMonetaryValue } from '~/@types/money'

defineProps<{
  value: TMonetaryValue
}>()
</script>

<template>
  <section class="my-12">
    <TitleComponent title="Net worth" />
    <div class="barlow-condensed-regular text-[48px] -mt-4">
      <span>{{ value.currency }} {{ value.value }}</span>
    </div>
  </section>
</template>
