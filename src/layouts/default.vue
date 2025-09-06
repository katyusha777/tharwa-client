<script setup lang="ts">
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { authenticatedUser } = storeToRefs(authStore)
</script>

<template>
  <AppHeader class="mb-12" />
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>

  <TabBar />
  <Modals />

  <footer
    class="border-t-2 border-[#181E29] pl-[10px] flex items-center justify-center text-white overflow-hidden transition-all duration-500 absolute bottom-0 z-[99]"
  />
</template>

<style lang="scss" scoped>
.main-border {
  border: 2px solid #faa94c2e;
  border-radius: 3px;
}

.sidebar-border {
  border: 2px solid #161a23c4;
  border-radius: 3px;
}

.horizontal-line {
  height: 40px;
  width: 2px;
  background: #fff;
  opacity: 25%;
}

.bg-image {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0 !important;

  @media screen and (max-width: 1200px) {
    width: calc(100vw - 233px);
  }
}

#user-inventory {
  position: relative;
  padding: 0 1rem;

  #inventory-container {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 330px;
    background: var(--color-dark-mid);
    border-radius: var(--border-radius);
    padding: 0 1rem;
  }
}

.corner {
  position: absolute;
  width: 31px;
  height: 31px;
  z-index: 9999;
}

.popup-base {
  transition: left 0.4s ease;
}

.popup-hide {
  transition: left 0.4s ease, opacity 0.4s ease;
}

.popup-show {
  transition: left 0.4s ease;
}

.top-left {
  top: -2px;
  left: -2px;
  border-top: 2px solid #FAA94C;
  border-left: 2px solid #FAA94C;
  border-top-left-radius: 3px;
}

.top-right {
  top: -2px !important;
  right: -2px !important;
  border-top: 2px solid #FAA94C;
  border-right: 2px solid #FAA94C;
  border-top-right-radius: 3px;
}

.bottom-left {
  bottom: -2px;
  left: -2px;
  border-left: 2px solid #FAA94C;
  border-bottom: 2px solid #FAA94C;
  border-bottom-left-radius: 3px;
}

.bottom-right {
  bottom: -2px !important;
  left: calc(100% - 29px) !important;
  border-bottom: 2px solid #FAA94C;
  border-right: 2px solid #FAA94C;
  border-bottom-right-radius: 3px;
}
</style>
