<script setup lang="ts">
import RenderVnode from '@/utils/RenderVnode.ts'
import type { MessageProps } from '@/components/Message/types.ts'
import Icon from '@/components/Icon/Icon.vue'
import { computed, onMounted, ref } from 'vue'
import useEventListener from '@/hooks/useEventListener.ts'

const {
  type = 'info',
  message,
  duration = 3000,
  showClose = false,
  destroy,
  zIndex,
  disableEsc = false,
  transitionName = 'fade-up',
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

const cssStyle = computed(() => ({
  top: offset + 'px',
  zIndex,
}))

if (!disableEsc) {
  useEventListener(document, 'keydown', (e: Event) => {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
      visible.value = false
    }
  })
}
</script>

<template>
  <Transition
    :name="transitionName"
    @after-leave="destroy"
  >
    <div
      v-show="visible"
      ref="messageRef"
      class="vk-message"
      :class="{ [`vk-message--${type}`]: type}"
      :style="cssStyle"
      @mouseenter="stopTimer"
      @mouseleave="startTimer"
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
  </Transition>
</template>
