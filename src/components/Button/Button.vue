<script setup lang="ts">
import type { ButtonProps } from './types.ts'
import { ref } from 'vue'

defineOptions({
  name: 'VKButton',
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _refButton = ref<HTMLButtonElement>()
defineExpose({
  ref: _refButton,
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
    <slot />
  </button>
</template>

<style>
@import 'style.css';
</style>
