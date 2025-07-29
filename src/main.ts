import type { UserModule } from './types'
import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'
import SessionService from '~/app/services/SessionService'
import App from './App.vue'
import './assets/styles/app.scss'
import './assets/styles/colors.css'
import './assets/styles/variables.css'
import 'uno.css'
import './assets/styles/tailwind.css'
import './assets/fontawesome/css/fontawesome.min.css'
import './assets/fontawesome/css/light.min.css'
import './assets/fontawesome/css/solid.css'

const layoutRoutes = setupLayouts(routes)
SessionService.initialiseSession()

export const createApp = ViteSSG(
  App,
  {
    routes: layoutRoutes,
    base: import.meta.env.BASE_URL,
    scrollBehavior() {
      document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })
    },
  },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
