import type { App } from 'vue'
import Upload from './Upload.vue'
import UploadList from '@/components/Upload/UploadList.vue'

Upload.install = (app: App): void => {
  app.component(Upload.name as string, Upload)
}
UploadList.install = (app: App): void => {
  app.component(UploadList.name as string, UploadList)
}
export default Upload
export { UploadList }
export * from './types'
