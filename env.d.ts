/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACEBOOK_PIXEL_ID: string
  readonly VITE_API_URL: string
  // Add all other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
