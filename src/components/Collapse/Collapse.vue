<script setup lang="ts">
import { provide } from 'vue'
import { CollapseContextKey, type CollapseEmites, type CollapseProps, type NameType } from '@/components/Collapse/types.ts'

defineOptions({
  name: 'VKCollapse',
})
// 注意 withDefaults解构会丢失响应性
const props = withDefaults(defineProps<CollapseProps>(), { accordion: false, modelValue: () => [] })
const emits = defineEmits<CollapseEmites>()

// const activeNames = ref<NameType[]>(modelValue)
// const handleItemClick = (itemName: NameType): void => {
//   const index = activeNames.value.indexOf(itemName)
//   if (index >= 0) {
//     activeNames.value.splice(index, 1)
//   } else {
//     activeNames.value.push(itemName)
//   }
//   emits('update:modelValue', activeNames.value)
//   emits('change', activeNames.value)
// }


// 3.4之后可以使用defineModal
const modelValue = defineModel<CollapseProps['modelValue']>({ default: [] })
const handleItemClick = (itemName: NameType): void => {
  if (props.accordion) {
    modelValue.value = [itemName === modelValue.value[0] ? '' : itemName]
  } else {
    const index = modelValue.value.indexOf(itemName)
    if (index >= 0) {
      modelValue.value.splice(index, 1)
    } else {
      modelValue.value.push(itemName)
    }
    // emits('update:modelValue', activeNames.value)
    emits('change', modelValue.value)
  }
}


if (props.accordion && modelValue.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

// provide(CollapseContextKey, { activeNames, handleItemClick })
provide(CollapseContextKey, { activeNames: modelValue, handleItemClick })
</script>

<template>
  <div class="vk-collapse">
    <slot />
  </div>
</template>

<style scoped>

</style>
