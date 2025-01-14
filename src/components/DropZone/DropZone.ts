import { type SetupContext, h, ref, computed } from 'vue'

export interface DropperProps {
	// The element that the component should be rendered as
	is?: string
}

export interface DropperEmits {
	fileDrop(files: FileList): void
}

const DropZone = (props: DropperProps, ctx: SetupContext<DropperEmits>) => {
  const { is = 'div' } = props
  const { emit, slots } = ctx

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

  const className = computed(() => 'vk-dropzone' + (dragOver.value ? ' is-dragover' : ''))

  return (
    h(is, {
      class: className.value,
	    // className: className.value,
	    ondrop: handleDrop,
	    onDragover: (e: DragEvent) => handleDrag(e, true),
	    onDragleave: (e: DragEvent) => handleDrag(e, false),
    },
    slots)
  )
}

export default DropZone
