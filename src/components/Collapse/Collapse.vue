<script setup lang="ts">
import { provide, ref } from 'vue'
import { CollapseContextKey, type NameType } from '@/components/Collapse/types.ts'

defineOptions({
  name: 'VKCollapse',
})
const activeNames = ref<NameType[]>([])
const handleItemClick = (itemName: NameType): void => {
  const index = activeNames.value.indexOf(itemName)
  if (index >= 0) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(itemName)
  }

}

provide(CollapseContextKey, { activeNames, handleItemClick })
</script>

<template>
  <div class="vk-collapse">
    <slot />
  </div>
</template>

<style scoped>

</style>
