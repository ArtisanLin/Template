import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

function loadEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {}
  const result = dotenv.config({ path: filePath })
  return result.parsed || {}
}

// 找到 workspace 根目录的 .env 和 .env.local
const rootDir = path.resolve(__dirname, '../../')
const envPath = path.join(rootDir, '.env')
const envLocalPath = path.join(rootDir, '.env.local')

const envVars = {
  ...loadEnvFile(envPath),
  ...loadEnvFile(envLocalPath),
}

const defineEnv = Object.fromEntries(
  Object.entries(envVars)
    .filter(([key]) => key.startsWith('VITE_'))
    .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
)
const BASE_PATH = path.resolve(__dirname, '../..')
const CORE_PATH = path.resolve(BASE_PATH, 'packages/core/src/index.ts')
const COMPONENTS_PATH = path.resolve(BASE_PATH, 'components')

// https://vite.dev/config/
export default defineConfig({
  base: '/2d-proxy/image',
  server: {
    port: 3004,
    host: true,
    headers: {
      'Cache-Control': 'no-store',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    fs: {},
  },
  build: {
    target: 'esnext',
  },
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __SERVER__: false,
    ...defineEnv,
  },
  resolve: {
    alias: {
      components: COMPONENTS_PATH,
      '@template/core': CORE_PATH,
    },
  },
  plugins: [react()],
})
