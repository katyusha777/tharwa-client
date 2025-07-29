<script setup lang="ts">
import StoresHelper from '@helpers/StoresHelper'
import { storeToRefs } from 'pinia'

StoresHelper.initialiseStores()

const authStore = useAuthStore()
const { authenticatedUser } = storeToRefs(authStore)

const route = useRoute()

const pageClasses = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.length ? segments : ['home']
})

useHead({
  title: 'Client | Shariah-Compliant Investment Intelligence',
  meta: [
    { name: 'description', content: 'Track your Shariah-compliant investments, analyze portfolio performance, and stay updated with AI-powered insights.' },
    { property: 'og:title', content: 'Client | Shariah-Compliant Investment Intelligence' },
    { property: 'og:description', content: 'Track your Shariah-compliant investments, analyze portfolio performance, and stay updated with AI-powered insights.' },
    { property: 'og:image', content: 'https://client.app/opengraph-img.webp' },
    { property: 'og:image:type', content: 'image/webp' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: 'https://client.app' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Client' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Client | Shariah-Compliant Investment Intelligence' },
    { name: 'twitter:description', content: 'Track your Shariah-compliant investments, analyze portfolio performance, and stay updated with AI-powered insights.' },
    { name: 'twitter:image', content: 'https://client.app/opengraph-img.webp' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicons/64.png' },
    { rel: 'canonical', href: 'https://client.app' },
  ],
})
</script>

<template>
  <main :class="pageClasses">
    <RouterView />
  </main>
</template>
