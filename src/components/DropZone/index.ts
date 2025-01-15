import DropZone from './DropZone.vue'
import type { App } from 'vue'

DropZone.install = (app: App) => {
  app.component(DropZone.name as string, DropZone)
}
export default DropZone

export * from './DropZone.ts'
