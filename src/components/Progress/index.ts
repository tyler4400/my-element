import Progress, { type ProgressProps } from './Progress'
import type { App } from 'vue'

export default {
  install (app: App) {
    app.component('VKProgress', Progress)
  },
  name: 'VKProgress',
}

export { Progress, type ProgressProps }
