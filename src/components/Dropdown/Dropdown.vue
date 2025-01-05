<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from '@/components/Dropdown/types.ts'
import { ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/types.ts'
import RenderVnode from '@/utils/RenderVnode.ts'

defineOptions({
  name: 'VKDropdown',
})
const emits = defineEmits<DropdownEmits>()
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

const { menuOptions, hideAfterClick = true, ...TooltipProps } = defineProps<DropdownProps>()

const tooltipRef = ref<TooltipInstance | null>()
const itemClick = (item: MenuOption) => {
  if (item.disabled) {
    return
  }
  emits('select', item)
  if (hideAfterClick) {
    tooltipRef?.value?.hide?.()
  }
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>

<template>
  <div class="vk-dropdown">
    <Tooltip
      v-bind="TooltipProps"
      ref="tooltipRef"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="vk-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder" />
            <li
              :id="`dropdown-item-${item.key}`"
              class="vk-dropdown__item"
              :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
              @click="itemClick(item)"
            >
              <RenderVnode :node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped>

</style>
