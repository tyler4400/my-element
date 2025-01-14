<script setup lang="ts">
import type { DropperProps } from '@/components/DropZone/DropZone.ts'
import { ref } from 'vue'

interface DropZoneProps {
  (e: 'fileDrop', file: FileList): void
}

const { is } = defineProps<DropperProps>()
const emit = defineEmits<DropZoneProps>()

const dragOver = ref(false)
const handleDrag = (e: DragEvent, over: boolean) => {
  e.preventDefault()
  dragOver.value = over
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  dragOver.value = false
  // onFile?.(e.dataTransfer?.files)
  if (e.dataTransfer) {
    emit('fileDrop', e.dataTransfer.files)
  }
}


</script>

<template>
  <component
    :is
    class="vk-dropzone"
    :class="{'is-dragover': dragOver}"
    @dragover="(e: DragEvent) => handleDrag(e, true)"
    @dragleave="(e: DragEvent) => handleDrag(e, false)"
    @drop="handleDrop"
  >
    <slot />
  </component>
</template>

<style scoped>

</style>
