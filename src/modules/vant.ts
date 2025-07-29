import type { UserModule } from '~/types'
import vant from 'vant'

import 'vant/lib/index.css'

export const install: UserModule = ({ app }) => {
  app.use(vant)
}
