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
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      outDir: 'dist/types',
      'include': ['src/index.ts', 'src/components/**/*', 'src/hooks/**/*.vue'],
      'exclude': ['src/**/*.test.*'],
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
      entry: resolve(__dirname, './src/index.ts'), // 组件编译时的入口文件
      name: 'tyler-element',
      fileName: 'tyler-element', // build打包后生成的dist文件夹中的文件名
      formats: ['es']
    },
    rollupOptions: {
      external: [ // 打包过程中不会对这些外部模块进行打包，而是从外部直接加载
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
