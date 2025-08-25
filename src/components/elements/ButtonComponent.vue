<script setup lang="ts">
interface Props {
  label: string
  kind?: 'normal' | 'link'
}

interface Emits {
  click: []
}

withDefaults(defineProps<Props>(), {
  kind: 'normal',
})

const emit = defineEmits<Emits>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <button
    :class="`type-${kind}`"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
button {
  border: none;
  cursor: pointer;
  margin: 1rem 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
