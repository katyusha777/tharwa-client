<script setup lang="ts">
import type { IOption } from '~/@types'
import FloatLabel from 'primevue/floatlabel'
import Select from 'primevue/select'

interface Props {
  modelValue?: IOption | null
  options: IOption[]
  label?: string
  placeholder?: string
}

interface Emits {
  'update:modelValue': [value: IOption | null]
}

defineProps<Props>()

const emit = defineEmits<Emits>()

function handleUpdate(value: IOption | null) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <FloatLabel class="w-full md:w-56" variant="on">
      <Select
        :model-value="modelValue"
        input-id="select_label"
        :options="options"
        option-label="name"
        option-value="value"
        :placeholder="placeholder"
        class="w-full"
        variant="filled"
        @update:model-value="handleUpdate"
      />
      <label for="select_label">{{ label }}</label>
    </FloatLabel>
  </div>
</template>
