<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type IconProps } from './types.ts'

defineOptions({
  name: 'VKIcon',
  inheritAttrs: false,
})
defineProps<IconProps>()

</script>

<template>
  <i
    class="vk-icon"
    :class="{[`vk-icon--${type}`] : type }"
    :style="color ? { color }: {}"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="$props" />
  </i>
</template>

<style scoped>

</style>
