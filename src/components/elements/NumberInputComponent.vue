<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'

interface Props {
  modelValue?: number | null
  inputType?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean
  variant?: 'filled' | 'outlined'
  size?: 'small' | 'large'
}

interface Emits {
  'update:modelValue': [value: number]
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  inputType: 'text',
  label: 'Label',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  variant: 'filled',
})

const emit = defineEmits<Emits>()

function handleUpdate(value: number) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <FloatLabel
      class="w-full"
      variant="on"
    >
      <InputNumber
        :id="`input_${Math.random().toString(36).substr(2, 9)}`"
        :model-value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :invalid="error"
        :variant="variant"
        :size="size"
        class="w-full"
        @update:model-value="handleUpdate"
      />
      <label :for="`input_${Math.random().toString(36).substr(2, 9)}`">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </FloatLabel>
  </div>
</template>
