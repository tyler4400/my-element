import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tyler Component Project',
  description: 'hhhhhhha',
  base: '/my-element/',
  // srcDir: '',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    },
    plugins: [
      vueJsx(),
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '总览',
        items: [
          { text: '所有组件', link: '/components/app' },
        ]
      },
      {
        text: '组件',
        items: [
          { text: '按钮 Button', link: '/components/button' },
          { text: '输入 Input', link: '/components/input' },
          { text: '消息 Message', link: '/components/message' },
          { text: '开关 Switch', link: '/components/switch' },
          { text: '选择器 Select', link: '/components/select' },
          { text: '上传 Upload', link: '/components/upload' },
          { text: '表单 Form', link: '/components/form' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
