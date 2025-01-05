<script setup lang="ts">
/**
 * arrow 的方向有问题， 还未解决
 */
import type { TooltipEmits, TooltipInstance, TooltipProps } from '@/components/Tooltip/types.ts'
import { computed, reactive, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside.ts'
import { useFloating, shift, flip, offset } from '@floating-ui/vue'

const emits = defineEmits<TooltipEmits>()
const { trigger, transition = 'fade', placement = 'bottom' } = defineProps<TooltipProps>()
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

const isOpen = ref(false)
const setOpen = (open?: boolean) => {
  isOpen.value = open ? open : !isOpen.value
  emits('visible-change', isOpen.value)
}

let events: Partial<Record<string, Function>> = reactive({})
let outerEvents: Partial<Record<string, Function>> = reactive({})
watch(() => trigger, (newTrigger) => {
  events = {}
  outerEvents = {}
  if (newTrigger === 'hover') {
    events['mouseenter'] = () => setOpen(true)
    outerEvents['mouseleave'] = () => setOpen(false)
  }
  if (newTrigger === 'click') {
    events['click'] = () => {
      setOpen()
    }
  }
}, { immediate: true, flush: 'sync' })

useClickOutside(popperContainerNode, () => {
  if (trigger === 'click' && isOpen.value) {
    setOpen(false)
    emits('click-outside', true)
  }
})

const { floatingStyles } = useFloating(triggerNode, popperNode, {
  middleware: [shift(), flip(), offset(9)],
  placement,
})
// 这里用data-popper-placement的值来给css确定偏移量, 但仍然又些许问题，这里就不修改了
const arrowPlace = computed<string>(() => placement.split('-')[0])

defineExpose<TooltipInstance>({
  show: () => setOpen(true),
  hide: () => setOpen(false),
})

</script>

<template>
  <div
    ref="popperContainerNode"
    class="vk-tooltip"
    v-on="outerEvents"
  >
    <div
      ref="triggerNode"
      class="vk-tooltip__trigger"
      v-on="events"
    >
      <slot />
    </div>
    <Transition :name="transition">
      <div
        v-if="isOpen"
        ref="popperNode"
        class="vk-tooltip__popper"
        :style="floatingStyles"
        :data-popper-placement="arrowPlace"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" />
      </div>
    </Transition>
  </div>
</template>
