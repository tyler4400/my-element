<script setup lang="ts">
import RenderVnode from '@/utils/RenderVnode.ts'
import type { MessageProps } from '@/components/Message/types.ts'
import Icon from '@/components/Icon/Icon.vue'
import { onMounted, ref } from 'vue'

const { type = 'info', message, duration = 3000, showClose = false } = defineProps<MessageProps>()

const visible = ref<boolean>(false)

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
</script>

<template>
  <div
    v-if="visible"
    class="vk-message"
    :class="{ [`vk-message-${type}`]: type}"
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
