import type { App } from 'vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name as string, Tooltip)
}

export default Tooltip

export * from './types'
