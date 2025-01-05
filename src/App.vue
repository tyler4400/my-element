<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { h, onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types.ts'
import Collapse from '@/components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
import Icon from '@/components/Icon/Icon.vue'
// import Popperjs from '@/example/Popperjs.vue'
// import FloatUI from '@/example/FloatUI.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipProps } from '@/components/Tooltip/types.ts'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import type { MenuOption } from '@/components/Dropdown/types.ts'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log('buttonRef', buttonRef.value?.ref)

})

const CollapseModel = ref(['a'])
onMounted(() => {
  setTimeout(() => {
    CollapseModel.value = ['b']
  }, 2000)
})
const accordion = ref(false)
const toggleAccordion = () => {
  accordion.value = !accordion.value
  CollapseModel.value = []
}

const tooltipTrigger = ref<TooltipProps['trigger']>('hover')
onMounted(() => {
  setTimeout(() => {
    tooltipTrigger.value = 'click'
  }, 2000)
})

const options: MenuOption[] = [
  { key: 1, label: h('span', [h(Icon,{ icon: 'user'}), ' hello']) },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

</script>

<template>
  <header>
    <h1>组件展示</h1>
  </header>

  <ul>
    <li>
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
      <Button size="small" icon="star">Icon</Button><br><br>
    </li>
    <li>
      <h1>Collapse组件: <span @click="toggleAccordion">点此切换手风琴开关 {{ accordion }}</span></h1>
      <p>CollapseModel: {{ CollapseModel }}</p>
      <Collapse v-model="CollapseModel" :accordion="accordion" @change="values => console.log('Collapse:change', values)">
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
    </li>
    <li>
      <h1>Icon组件</h1>
      <Icon icon="arrow-up" type="primary" />
      <Icon icon="user" size="2xl" type="danger" color="#0e7a0d" />
    </li>
    <li>
      <h1>Tooltip组件</h1>
      <Tooltip :trigger="tooltipTrigger" placement="bottom-start">
        <div>  hover2s后变click</div>
        <template #content>
          <Button type="primary">确认删除</Button>
        </template>
      </Tooltip>
      <div>
        <Tooltip content="hello~" trigger="hover" placement="right-end">
          <p>  hover</p>
        </Tooltip>
      </div>
    </li>
    <!--    <div>-->
    <!--      <Popperjs />-->
    <!--      <FloatUI />-->
    <!--    </div>-->
    <li>
      <h1>Dropdown组件</h1>
      <Dropdown
        ref="tooltipRef"
        placement="bottom-end"
        trigger="click"
        :menu-options="options"
        @visible-change="e => console.log('visible change', e)"
        @select="e => console.log('select', e)"
      >
        <div>打开弹出菜单</div>
      </Dropdown>
    </li>
  </ul>
</template>

<style scoped>
</style>
