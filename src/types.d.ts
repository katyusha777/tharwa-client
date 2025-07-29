import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

declare global {
  interface Window {

  }
}
