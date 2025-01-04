<script setup lang="ts">
import type { TooltipEmits, TooltipInstance, TooltipProps } from '@/components/Tooltip/types.ts'
import { reactive, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside.ts'

const emits = defineEmits<TooltipEmits>()
const { trigger, transition = 'fade' } = defineProps<TooltipProps>()
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

const isOpen = ref(false)
const setOpen = (open?: boolean) => {
  isOpen.value = open === undefined ? !isOpen.value : open
  emits('visible-change', isOpen.value)
}

let events: Partial<Record<string, Function>> = reactive({})
watch(() => trigger, (newTrigger) => {
  events = {}
  if (newTrigger === 'hover') {
    events['mouseenter'] = () => setOpen(true)
    events['mouseleave'] = () => setOpen(false)
  }
  if (newTrigger === 'click') {
    events['click'] = (e: MouseEvent) => {
      if (isOpen.value) {
        if (!popperNode?.value?.contains?.(e.target as HTMLElement)) { // 弹出层打开时， 点击内部会被忽略，不会关闭
          setOpen(false)
        }
      } else {
        setOpen(true)
      }
    }
  }
}, { immediate: true })

useClickOutside(popperContainerNode, () => {
  if (trigger === 'click' && isOpen.value) {
    setOpen(false)
    emits('click-outside', true)
  }
})

defineExpose<TooltipInstance>({
  show: () => setOpen(true),
  hide: () => setOpen(false),
})

</script>

<template>
  <div ref="popperContainerNode" class="vk-tooltip" v-on="events">
    <div ref="triggerNode" class="vk-tooltip__trigger">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="vk-tooltip__popper">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
