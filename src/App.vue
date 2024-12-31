<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Button from '@/components/Button/Button.vue'
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types.ts'
import Collapse from '@/components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log('buttonRef', buttonRef.value?.ref)
})

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="组件展示" />
    </div>
  </header>

  <main>
    <div>
      <h1>button组件:</h1>
      shape: <Button ref="buttonRef">Test Button</Button>
      <Button plain>Plain Button</Button>
      <Button round>Round Button</Button>
      <Button circle>VK</Button>
      <Button disabled>Disabled Button</Button><br><br>
      type: <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button><br><br>
      plain: <Button type="primary" plain>Primary</Button>
      <Button type="success" plain>Success</Button>
      <Button type="info" plain>Info</Button>
      <Button type="warning" plain>Warning</Button>
      <Button type="danger" plain>Danger</Button><br><br>
      size: <Button size="large">Large</Button>
      <Button size="small">Small</Button><br><br>
      other things: <Button size="large" loading>large Loading</Button>
      <Button size="large" icon="arrow-up">Icon</Button><br><br>
    </div>
    <div>
      <h1>Collapse组件:</h1>
      <Collapse>
        <Item name="a">
          <template #title>
            Template title A
          </template>
          <h1>headline title</h1>
          <div> this is content a aaa </div>
        </Item>
        <Item name="b" title="Title B">
          <div> this is bbbbb test </div>
        </Item>
        <Item name="c" title="Disabled Title C" disabled>
          <div> this is cccc test </div>
        </Item>
      </Collapse>
    </div>
  </main>
</template>

<style scoped>
</style>
