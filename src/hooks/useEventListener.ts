import { type Ref, isRef, watch, onMounted, onBeforeUnmount, unref } from 'vue'

const useEventListener  = <T extends Event>(
  target: EventTarget | Ref<EventTarget | null>,
  event: string,
  handler: (e: T) => void
) => {
  if (isRef(target)) {
    watch(target, (value, oldValue, onCleanup) => {
      onCleanup(() => {
        oldValue?.removeEventListener(event, handler as EventListener)
      })
      value?.addEventListener(event, handler as EventListener)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler as EventListener)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler as EventListener)
  })
}

export default useEventListener
