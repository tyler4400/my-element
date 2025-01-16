/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist/umd'),
    sourcemap: true,
    // 开启库模式打包
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'tyler-element',
      fileName: 'tyler-element',
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        // assetFileNames: 'style-[hash][extname]',
      }
    }
  },
})
