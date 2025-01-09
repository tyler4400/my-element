<script setup lang="ts">
import type { InputEmits, InputProps, InputSlots } from '@/components/Input/types.ts'
import { computed, ref, useAttrs } from 'vue'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({
  name: 'VKInput',
  inheritAttrs: false,
})
const slots = defineSlots<InputSlots>()
console.log('slots', slots)
console.log('prepend', slots.prepend)

const emits = defineEmits<InputEmits>()

const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>()

const { type = 'text', autocomplete = 'off', clearable, disabled, showPassword } = defineProps<InputProps>()

const innerValue = defineModel<InputProps['modalValue']>()

/* 事件 */
const handleInput = () => {
  emits('input', innerValue.value as InputProps['modalValue']) // 这里不知道为什么类型报错， 明明是一样的
}
const handleChange = () => {
  emits('change', innerValue.value as InputProps['modalValue'])
}
const isFocus = ref(false)
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  console.log('blur triggered')
  isFocus.value = false
  emits('blur', event)
}

/* 清除 */
const showClear = computed(() =>
  clearable &&
    !disabled &&
    !!innerValue.value &&
    isFocus.value
)
const clear = () => {
  console.log('clear triggered')
  innerValue.value = ''
  emits('clear')
  emits('input', '')
  emits('change', '')
}

/* 密码眼睛 */
const passwordVisible = ref(false)
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const showPasswordArea = computed(() =>
  showPassword &&
    !disabled &&
    !!innerValue.value
)

/* expose */
defineExpose({
  ref: inputRef
})
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
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="!!slots.prepend" class="vk-input__prepend">
        <slot name="prepend" />
      </div>
      <div
        class="vk-input__wrapper"
        :class="{
          [`vk-input--${type}`]: type,
          [`vk-input--${size}`]: size,
          'is-disabled': disabled,
          'is-prepend': slots.prefix,
          'is-append': slots.append,
          'is-prefix': slots.prefix,
          'is-suffix': slots.suffix,
          'is-focus': isFocus
        }"
      >
        <span v-if="!!slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          v-bind="attrs"
          ref="inputRef"
          v-model="innerValue"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          class="vk-input__inner"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        >
        <span v-if="!!slots.suffix || showClear || showPasswordArea" class="vk-input__suffix">
          <slot name="suffix" />
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="vk-input__clear"
            @click="clear"
            @mousedown.prevent="() => {}"
          />
          <Icon
            v-if="showPasswordArea"
            :icon="passwordVisible ? 'eye' : 'eye-slash'"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="!!slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        ref="inputRef"
        v-model="innerValue"
        v-bind="attrs"
        class="vk-textarea__wrapper"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
