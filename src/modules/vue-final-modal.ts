import type { UserModule } from '~/types'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

export const install: UserModule = ({ app }) => {
  const vfm = createVfm()
  app.use(vfm)
}
