<script setup lang="ts">
import type { InputProps, InputSlots } from '@/components/Input/types.ts'

defineOptions({
  name: 'VKInput',
  inheritAttrs: false,
})
const slots = defineSlots<InputSlots>()
console.log('slots', slots)
console.log('prepend', slots.prepend)

const { type = 'text', autocomplete = 'off' } = defineProps<InputProps>()

</script>

<template>
  <div
    class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': slots.prefix,
      'is-append': slots.append,
      'is-prefix': slots.prefix,
      'is-suffix': slots.suffix,
      // 'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="!!slots.prepend" class="vk-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="vk-input__wrapper">
        <span v-if="!!slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
        </span>
        <input type="text" class="vk-input__inner">
        <span v-if="!!slots.prefix" class="vk-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="!!slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        class="vk-textarea__wrapper"
        :autocomplete="autocomplete"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
