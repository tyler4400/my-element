/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist/es'),
    sourcemap: true,
    // 开启库模式打包
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'tyler-element',
      fileName: 'tyler-element',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        '@floating-ui/vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@vue/test-utils',
        'async-validator',
        'axios',
      ],
      output: {
        // exports: 'named',
        globals: {
          vue: 'Vue',
        },
        // assetFileNames: '[name]-[hash][extname]',
        // assetFileNames: ({ names }) => {
        //   if (names === 'style')
        // }
      }
    }
  },
})
