<script setup lang="ts">
// 学习 popperjs https://floating-ui.com/docs/vue
import { useFloating, autoUpdate } from '@floating-ui/vue'
import { ref } from 'vue'

const triggerNode = ref<HTMLElement>()
const overlayNode = ref<HTMLElement>()

const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const { floatingStyles } = useFloating(triggerNode, overlayNode, {
  placement: 'bottom-end',
  open: isOpen.value,
  whileElementsMounted: autoUpdate,

})


</script>

<template>
  <button @click="toggleOpen()">{{ isOpen }}</button>
  <div style="width: 300px; height: 300px; overflow: hidden; background: aliceblue;">
    <img ref="triggerNode" src="@/assets/logo.svg" alt="" height="125">
    <div v-if="isOpen" ref="overlayNode" :style="floatingStyles">hello~</div>
  </div>
</template>

<style scoped>

</style>
