<script setup lang="ts">
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'

// Form state
const isLogin = ref(true)

// Form data
const name = ref('')
const email = ref('')
const password = ref('')
const avatar = ref<File | null>(null)

// Toggle between login and register with smooth transition
function toggleMode() {
  isLogin.value = !isLogin.value
  // Reset form when switching
  name.value = ''
  email.value = ''
  password.value = ''
  avatar.value = null
}

// Handle avatar upload
function onAvatarSelect(event: any) {
  avatar.value = event.files[0]
}

// Handle form submission
function handleSubmit() {
  if (isLogin.value) {
    console.log('Login data:', {
      email: email.value,
      password: password.value,
    })
  }
  else {
    console.log('Register data:', {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    })
  }
}
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-8 left-8 w-32 h-32">
      <div class="relative">
        <!-- Sun rays -->
        <div class="absolute inset-0">
          <div
            v-for="i in 12" :key="i"
            class="absolute w-16 h-1 bg-gradient-to-r from-yellow-200 to-transparent origin-left"
            :style="{ transform: `rotate(${i * 30}deg)` }"
          />
        </div>
      </div>
    </div>

    <!-- Sparkle -->
    <div
      class="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-300 rotate-45 transform origin-center"
      style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
    />

    <!-- Curved arrow and striped circle -->
    <div class="absolute bottom-32 left-16 opacity-30">
      <svg width="120" height="120" viewBox="0 0 120 120" class="text-gray-400">
        <path d="M20 60 Q60 20 100 60" stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>
      </svg>
      <div class="w-12 h-12 rounded-full bg-yellow-200 relative overflow-hidden mt-4">
        <div
          v-for="i in 8" :key="i"
          class="absolute inset-0 bg-black"
          :style="{
            transform: `rotate(${i * 22.5}deg)`,
            clipPath: 'polygon(50% 50%, 50% 0%, 62.5% 0%, 62.5% 50%)',
          }"
        />
      </div>
    </div>

    <!-- Main form container -->
    <div class="w-full max-w-sm bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 backdrop-blur-sm">
      <!-- Header with smooth transition -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white transition-all duration-500 ease-in-out">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h1>
        <p class="text-gray-400 mt-2 transition-all duration-500 ease-in-out">
          {{ isLogin ? 'Sign in to your account' : 'Join us today' }}
        </p>
      </div>

      <!-- Form with smooth transitions -->
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Name field - only show for register -->
        <div
          class="transition-all duration-500 ease-in-out overflow-hidden"
          :class="isLogin ? 'max-h-0 opacity-0 -mb-6' : 'max-h-20 opacity-100'"
        >
          <div v-show="!isLogin">
            <IconField>
              <InputIcon>
                <i class="pi pi-user text-gray-400" />
              </InputIcon>
              <InputText
                id="name"
                v-model="name"
                type="text"
                placeholder="Full Name"
                fluid
                class="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </IconField>
          </div>
        </div>

        <!-- Email field -->
        <IconField>
          <InputIcon>
            <i class="pi pi-envelope text-gray-400" />
          </InputIcon>
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Email Address"
            fluid
            autofocus
            class="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </IconField>

        <!-- Password field -->
        <IconField>
          <InputIcon>
            <i class="pi pi-lock text-gray-400" />
          </InputIcon>
          <Password
            id="password"
            v-model="password"
            placeholder="Password"
            fluid
            :feedback="false"
            toggle-mask
            class="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </IconField>

        <!-- Avatar upload - only show for register -->
        <div
          class="transition-all duration-500 ease-in-out overflow-hidden"
          :class="isLogin ? 'max-h-0 opacity-0 -mb-6' : 'max-h-32 opacity-100'"
        >
          <div v-show="!isLogin" class="space-y-2">
            <label class="text-sm font-medium text-gray-300">Profile Picture (Optional)</label>
            <FileUpload
              mode="basic"
              name="avatar"
              accept="image/*"
              :max-file-size="5000000"
              choose-label="Choose Avatar"
              class="w-full"
              @select="onAvatarSelect"
            />
          </div>
        </div>

        <!-- Submit button -->
        <Button
          type="submit"
          :label="isLogin ? 'Sign In' : 'Get Started'"
          class="w-full bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-black font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02]"
        />

        <!-- Toggle mode section -->
        <div class="text-center pt-6 border-t border-gray-800">
          <p class="text-gray-400 text-sm mb-3">
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          </p>
          <button
            type="button"
            class="px-6 py-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-all duration-300 rounded-lg hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
            @click="toggleMode"
          >
            {{ isLogin ? 'Sign up' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for dark theme */
:deep(.p-inputtext) {
  background-color: #1f2937 !important;
  border-color: #374151 !important;
  color: white !important;
  border-radius: 0.75rem !important;
  padding: 0.875rem 1rem !important;
  padding-left: 2.5rem !important;
  transition: all 0.3s ease !important;
}

:deep(.p-inputtext:focus) {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 1px #10b981 !important;
  transform: translateY(-1px);
}

:deep(.p-inputtext::placeholder) {
  color: #9ca3af !important;
}

:deep(.p-password) {
  width: 100% !important;
}

:deep(.p-password .p-inputtext) {
  width: 100% !important;
  padding-right: 3rem !important;
}

:deep(.p-password .p-password-toggle-icon) {
  color: #9ca3af !important;
  right: 1rem !important;
}

:deep(.p-password .p-password-toggle-icon:hover) {
  color: #10b981 !important;
}

:deep(.p-iconfield .p-inputicon) {
  color: #9ca3af !important;
  left: 1rem !important;
}

:deep(.p-button) {
  transition: all 0.3s ease !important;
  border-radius: 0.75rem !important;
}

:deep(.p-fileupload) {
  background-color: #1f2937 !important;
  border: 1px solid #374151 !important;
  border-radius: 0.75rem !important;
}

:deep(.p-fileupload .p-button) {
  background-color: #374151 !important;
  border-color: #374151 !important;
  color: #d1d5db !important;
  border-radius: 0.5rem !important;
}

:deep(.p-fileupload .p-button:hover) {
  background-color: #4b5563 !important;
  border-color: #4b5563 !important;
}

/* Smooth transitions for all elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
