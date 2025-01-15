import type { App } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name as string, Dropdown)
}

export default Dropdown

export * from './types'
