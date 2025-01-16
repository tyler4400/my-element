import { h, render, shallowReactive, watch } from 'vue'
import type { CreateMessageProps, MessageContext } from '@/components/Message/types.ts'
import Message from '@/components/Message/Message.vue'
import useZIndex from '@/hooks/useZIndex.ts'

let seed = 0
export const messageInstances = shallowReactive<MessageContext[]>([])

// 当删除时， 重新计算offset
watch(() => messageInstances.length, (value, oldValue) => {
  if (value >= oldValue) return // 新增不需要重新计算offset
  messageInstances.reduce((offset, curr) => {
      curr.vnode.component!.props.offset = offset + curr.originPropOffset
      return offset + curr.originPropOffset + curr.vnode.el!.getBoundingClientRect().height
  }, 0)
})

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

  const { nextZIndex } = useZIndex()
  const lastBottomOffset = getLastBottomOffset()
  const newProps = {
    ...props,
    id,
    offset: (props.offset || 20) + lastBottomOffset, //  加上上一个的bottomOffset
    destroy,
    zIndex: nextZIndex(),
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

  const instance = {
    id,
    vnode: node,
    destroy,
    container,
    originPropOffset: props.offset || 20,
  }
  messageInstances.push(instance)
  return instance
}

const getLastInstance = () => {
  return messageInstances[messageInstances.length - 1]
}

// 获取上一个组件的 底部偏移量. 参数是当前组件的ID
const getLastBottomOffset = () => {
  const ins = getLastInstance()
  if (!ins) {
    return 0
  } else {
    return ins.vnode.el!.getBoundingClientRect().bottom
  }
}

export const destroyAll = () => {
  // messageInstances.forEach(instance => {
  //   instance.destroy()
  // })
  for (const instance of messageInstances) {
    render(null, instance.container)
  }
  messageInstances.splice(0, messageInstances.length)
}
