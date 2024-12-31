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
</script>

<template>
  <div
    class="vk-collapse-item"
    :class="{ 'is-disabled': disabled, 'is-active': isActive }"
    @click="handClick"
  >
    <div :id="`item-header-${name}`" class="vk-collapse-item__header">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-show="isActive" :id="`item-content-${name}`" class="vk-collapse-item__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
