<template>
  <div
    class="vk-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="popperOptions"
      manual
      @click-outside="() => controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="circle-xmark"
            class="vk-input__clear"
            @mousedown.prevent
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <template #content>
        <div v-if="states.loading" class="vk-select__loading">
          <Icon icon="spinner" spin />
        </div>
        <div v-else-if="filterable && filteredOptions.length === 0" class="vk-select__noData">
          no matching data
        </div>
        <ul v-else class="vk-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              :id="`select-item-${item.value}`"
              class="vk-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode :node="renderLabel ? renderLabel(item) : item.label" />
              <span v-if="states.selectedOption?.value === item.value"> Selected! </span>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import RenderVNode from '@/utils/RenderVnode.ts'
import type { InputInstance } from '../Input/types'

defineOptions({
  name: 'VKSelect'
})
const findOption = (value: string) => {
  const option = props.options.find((opt) => opt.value === value)
  return option || null
}
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const emits = defineEmits<SelectEmits>()
const timeout = computed(() => (props.remote ? 300 : 0))
const initialOption = findOption(props.modelValue)

const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>

const states = reactive<SelectStates>({
  inputValue: initialOption?.label || '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})
const isDropdownShow = ref(false)

// todo 这个参数传递给tooltip是不生效的， 我的tooltip实现方式不一样的，暂时不解决
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
const filteredOptions = ref(props.options)
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  }
)
watch(
  () => props.modelValue,
  (value) => {
    const option = findOption(value)
    states.inputValue = option?.label || ''
    states.selectedOption = option
  }
)
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (error) {
      console.error(error)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter((option) => option.label.includes(searchValue))
  }
  states.highlightIndex = -1
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
const debounceOnFilter = debounce(onFilter, timeout.value)
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder
})
const controlDropdown = (show: boolean) => {
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if (props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.code) {
  case 'Enter':
    if (!isDropdownShow.value) {
      controlDropdown(true)
    } else {
      if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
        itemSelect(filteredOptions.value[states.highlightIndex])
      } else {
        controlDropdown(false)
      }
    }
    break
  case 'Escape':
    if (isDropdownShow.value) {
      controlDropdown(false)
    }
    break
  case 'ArrowUp':
    e.preventDefault()
    if (filteredOptions.value.length > 0) {
      if ([-1, 0].includes(states.highlightIndex)) {
        states.highlightIndex = filteredOptions.value.length - 1
      } else {
        states.highlightIndex -= 1
      }
    }
    break
  case 'ArrowDown':
    e.preventDefault()
    if (filteredOptions.value.length > 0) {
      if ([-1, filteredOptions.value.length - 1].includes(states.highlightIndex)) {
        states.highlightIndex = 0
      } else {
        states.highlightIndex += 1
      }
    }
    break
  default:
    break
  }
}
const showClearIcon = computed(() => {
  return (
    props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ''
  )
})
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('change', '')
  emits('clear')
  emits('update:modelValue', '')
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>
