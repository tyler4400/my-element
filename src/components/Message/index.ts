import type { App } from 'vue'
import Message from '@/components/Message/Message.vue'
import { createMessage, destroyAll } from '@/components/Message/message.ts'
Message.install = (app: App) => {
  app.component(Message.name as string, Message)
}

export default Message
export { createMessage, destroyAll }
export * from './types'
