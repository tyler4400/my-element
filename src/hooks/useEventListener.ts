import { type Ref, isRef, watch, onMounted, onBeforeUnmount, unref } from 'vue'

const useEventListener  = (
  target: EventTarget | Ref<EventTarget | null>,
  event: string,
  handler: (e: Event) => void
) => {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

export default useEventListener
