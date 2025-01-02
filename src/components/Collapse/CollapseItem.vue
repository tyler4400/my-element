<script setup lang="ts">
import { CollapseContextKey, type CollapseItemProps } from '@/components/Collapse/types.ts'
import { computed, inject } from 'vue'

defineOptions({
  name: 'VKCollapseItem',
})
const { name, disabled, title} = defineProps<CollapseItemProps>() // 在 Vue 3.5 及以上版本中，从 defineProps 返回值解构出的变量是响应式的。Vue 的编译器会自动在前面添加 props.

const collapseContext = inject(CollapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(name))
const handClick = () => {
  if (disabled) {
    return
  }
  collapseContext?.handleItemClick(name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }

}
</script>

<template>
  <div
    class="vk-collapse-item"
    :class="{ 'is-disabled': disabled }"
    @click="handClick"
  >
    <div
      :id="`item-header-${name}`"
      class="vk-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive
      }"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div v-show="isActive" class="vk-collapse-item__wrapper">
        <div :id="`item-content-${name}`" class="vk-collapse-item__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/*.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}*/
</style>
