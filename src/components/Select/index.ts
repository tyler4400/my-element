import type { App } from 'vue'
import Select from '@/components/Select/Select.vue'

Select.install = (app: App) => {
  app.component(Select.name as string, Select)
}

export default Select

export * from './types'
