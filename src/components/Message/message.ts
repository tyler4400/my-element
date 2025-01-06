import { h, render } from 'vue'
import type { CreateMessageProps, MessageContext } from '@/components/Message/types.ts'
import Message from '@/components/Message/Message.vue'

let seed = 0
const messageInstances: MessageContext[] = []

export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const destroy = () => {
    const index = messageInstances.findIndex(inst => inst.id === id)
    if (index > -1) {
      messageInstances.splice(index, 1)
      render(null, container)
    }
  }
  const lastBottomOffset = getLastBottomOffset()
  const newProps = {
    ...props,
    id,
    offset: (props.offset || 20) + lastBottomOffset, //  加上上一个的bottomOffset
    destroy,
  }

  /**
   * 一个 vue 内部神奇的函数，文档中都没有特别的记录
   * 它负责将一个 vnode 渲染到dom节点上
   *
   * import { render ) from 'vue
   * render(vNode， DOM节点)
   */
  const node = h(Message, newProps)
  render(node, container)

  document.body.appendChild(container.firstElementChild!) // 属性后面加感叹号是非空断言符号

  const vm = node.component!
  const instance = {
    id,
    vnode: node,
    destroy,
    vm,
    // props: newProps,
  }
  messageInstances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return messageInstances.at(-1)
}

// 获取上一个组件的 底部偏移量. 参数是当前组件的ID
export const getLastBottomOffset = () => {
  const ins = getLastInstance()
  if (!ins) {
    return 0
  } else {
    console.log('getLastBottomOffset:messageRef', (ins.vm.refs!.messageRef as HTMLElement).getBoundingClientRect())
    return (ins.vm.refs!.messageRef as HTMLElement).getBoundingClientRect().bottom
  }
}
