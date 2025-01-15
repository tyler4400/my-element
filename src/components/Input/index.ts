import type { App } from 'vue'
import Input from '@/components/Input/Input.vue'

Input.install = (app: App) => {
  app.component(Input.name as string, Input)
}

export default Input

export * from './types'
