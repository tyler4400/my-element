<script setup lang="ts">
import type { ButtonProps } from './types.ts'
import { ref } from 'vue'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({
  name: 'VKButton',
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _refButton = ref<HTMLButtonElement>()
defineExpose({
  buttonEl: _refButton,
})

</script>

<template>
  <button
    ref="_refButton"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon v-if="loading" icon="spinner" spin />
    <Icon v-if="icon" :icon="icon" />
    <span><slot /></span>
  </button>
</template>
