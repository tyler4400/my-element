/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import eslint from 'vite-plugin-eslint' // 这里会有类型文件找不到的提示了， 修改了库文件，还可改使用另一个库@nabla/vite-plugin-eslint
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      emitWarning: true,
      emitError: true,
    }),
    dts({
      tsconfigPath: './tsconfig.build.json'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  /* warn 构建时不要修改这里， 这里不会真正用到， 请使用vite.es.config.ts， vite.umd.config.ts */
  build: {
    sourcemap: true,
    // 开启库模式打包
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'tyler-element',
      fileName: 'tyler-element',
      formats: ['umd', 'es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: '[name]-[hash][extname]',
        // assetFileNames: ({ names }) => {
        //   if (names === 'style')
        // }
      }
    }
  },
  test: { // 这里是test报错是读取不到其类型， 因为没有使用vitest的类型，要么就创建个vitest.config.ts,这里我懒了就忽略错误吧
    globals: true,
    environment: 'jsdom'
  }
})
