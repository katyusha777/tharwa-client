import type { UserModule } from '~/types'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import FocusTrap from 'primevue/focustrap'

export const install: UserModule = ({ app }) => {
  app.directive('focustrap', FocusTrap)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
}
