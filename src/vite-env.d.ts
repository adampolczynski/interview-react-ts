/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JSONBIN_MASTER_KEY: string
  readonly VITE_JSONBIN_ACCESS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
