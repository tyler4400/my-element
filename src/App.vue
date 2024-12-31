<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Button from '@/components/Button/Button.vue'
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types.ts'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log('buttonRef', buttonRef.value?.ref)
})

</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    >

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <Button ref="buttonRef">
      123
    </Button>
    <Button ref="buttonRef" type="primary">
      primary
    </Button>
    <a href="">2131231</a>
  </main>
</template>

<style scoped>
</style>
