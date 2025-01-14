<template>
  <div
    class="vk-switch"
    :class="{
      [`vk-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue"
  >
    <input
      ref="inputEl"
      class="vk-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    >
    <div class="vk-switch__core">
      <div class="vk-switch__core-inner">
        <span v-if="activeText || inactiveText" class="vk-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="vk-switch__core-action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, useModel, useTemplateRef } from 'vue'
import type { SwtichProps, SwtichEmits } from './types'

defineOptions({
  name: 'VkSwtich',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwtichProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwtichEmits>()

// 这里更好是用defineModal, 为了学习我们多种情况都写一写
// const innerValue = ref(props.modelValue)
const innerValue = useModel(props, 'modelValue')

// useTemplateRef 为3.5新增， 支持自动推断出类型，不用显式的写类型
// const inputEl = ref<HTMLInputElement>()
const inputEl = useTemplateRef('inputEl')
// 现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  // emits('update:modelValue', newValue)
  emits('change', newValue)
}
onMounted(() => {
  inputEl.value!.checked = checked.value
})
watch(checked, (val) => {
  inputEl.value!.checked = val
})
// watch(() => props.modelValue, (newValue) => {
//   innerValue.value = newValue
// })
</script>
