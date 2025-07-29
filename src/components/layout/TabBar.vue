```vue
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { path: '/', icon: 'fa-solid fa-house', label: 'Home' },
  { path: '/ai', icon: 'fa-solid fa-robot', label: 'AI' },
  { path: '/assets', icon: 'fa-solid fa-boxes-stacked', label: 'Assets' },
  { path: '/compliance', icon: 'fa-solid fa-shield-halved', label: 'Compliance' },
  { path: '/account', icon: 'fa-solid fa-user', label: 'Account' },
]

const active = computed({
  get: () => tabs.findIndex(tab => tab.path === route.path),
  set: (val: number) => {
    const tab = tabs[val]
    if (tab)
      router.push(tab.path)
  },
})
</script>

<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="(tab, index) in tabs"
      :key="index"
    >
      <template #icon>
        <i :class="tab.icon" />
      </template>
      {{ tab.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>
```
