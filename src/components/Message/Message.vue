<script setup lang="ts">
import RenderVnode from '@/utils/RenderVnode.ts'
import type { MessageProps } from '@/components/Message/types.ts'
import Icon from '@/components/Icon/Icon.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { getLastInstance } from '@/components/Message/message.ts'

const prevInstance = getLastInstance()
console.log('prevInstance', prevInstance)

const {
  type = 'info',
  message,
  duration = 3000,
  showClose = false,
  destroy,
  offset = 20, // 这里若是经过createMessage调用， 已经是计算好了总的top offset
} = defineProps<MessageProps>()

const visible = ref<boolean>(true)
const messageRef = ref<HTMLDivElement>()

let timer: NodeJS.Timeout
const startTimer = () => {
  if (duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}
const stopTimer = () => {
  clearTimeout(timer)
}




onMounted(() => {
  visible.value = true
  startTimer()
})


// 这个 div 的高度
// const height = ref(0)
// onMounted(async () => {
//   await nextTick()
//   height.value = messageRef.value!.getBoundingClientRect().height
// })

// const bottomOffset = computed(() => (height?.value ?? 0) + offset)
const cssStyle = computed(() => ({
  top: offset + 'px',
}))

watch(visible, () => {
  if (!visible.value) {
    destroy()
  }
})

defineExpose({
  // getBottomOffset: () => {
  //   console.log('getBottomOffset', bottomOffset.value)
  //   return bottomOffset.value
  // },
  visible,
})
</script>

<template>
  <div
    v-show="visible"
    ref="messageRef"
    class="vk-message"
    :class="{ [`vk-message-${type}`]: type}"
    :style="cssStyle"
    @mouseenter="startTimer"
    @mouseleave="stopTimer"
  >
    <div class="vk-message__content">
      <slot>
        <RenderVnode :node="message" />
      </slot>
    </div>
    <div v-if="showClose" class="vk-message__close">
      <Icon icon="xmark" @click.stop="visible = false" />
    </div>
  </div>
</template>

<style scoped>
  .vk-message{
    width: max-content;
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #79bbff;
  }
</style>
