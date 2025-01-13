<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { h, onMounted, reactive, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types.ts'
import Collapse from '@/components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
import Icon from '@/components/Icon/Icon.vue'
// import Popperjs from '@/example/Popperjs.vue'
// import FloatUI from '@/example/FloatUI.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipProps } from '@/components/Tooltip/types.ts'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import DropdownTSX from '@/components/Dropdown/Dropdown.tsx'
import type { MenuOption } from '@/components/Dropdown/types.ts'
import { createMessage, destroyAll } from '@/components/Message/message.ts'
import Input from '@/components/Input/Input.vue'
import Switch from '@/components/Switch/Switch.vue'
import Select from '@/components/Select/Select.vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import type { FormRules } from '@/components/Form/types.ts'

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
  { key: 1, label: h('span', [h(Icon,{ icon: 'house'}), ' home']) },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const createMsg = () => {
  createMessage({ message: 'msg1', offset: 10, disableEsc: true, type: 'info' })
  createMessage({ message: 'msg2', offset: 20, type: 'success' })
  createMessage({ message: 'msg2', offset: 20, type: 'warning' })
  createMessage({ message: 'msg3 not gone', duration: 0, showClose: true, offset: 30, type: 'danger' })
}

const createMsg2 = () => {
  for (let i = 0; i < 8; i++) {
    createMessage({ message: `msg${i}`, offset: 10, duration: 0, showClose: true })
  }
}

const test = ref<string>('')

const switchTtest = ref<boolean>(false)
const switchTest2 = ref<string>('wrong')

const selectTest = ref('1')
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]

const formRef = ref()
const model = reactive({
  email: '123',
  name: 'jack',
  password: '',
  confirmPwd: ''
})
const rules: FormRules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }],
  name: [{ type: 'string', required: true, trigger: 'input', min: 3, max: 5 }],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    {
      validator: (rule, value) => value === model.password,
      trigger: 'blur',
      message: '两个密码必须相同'
    }
  ]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch (e) {
    console.log('the error', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}

onMounted(() => {
  setTimeout(() => {
    createMessage({ message: 'selectTest的值变了', type: 'warning' })
    selectTest.value = '3'
  }, 2000)
})

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
      <h1>Collapse组件: <span>手风琴模式开关： <Switch model-value="accordion" active-text="on" inactive-text="off" size="large" @change="toggleAccordion" /></span></h1>
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
      <div>
        <DropdownTSX
          ref="tooltipRef"
          placement="bottom-end"
          trigger="click"
          :menu-options="options"
          @visible-change="e => console.log('visible change', e)"
          @select="e => console.log('select', e)"
        >
          <div>tsx实现Dropdown</div>
        </DropdownTSX>
      </div>
    </li>
    <li>
      <h1>Message组件</h1>
      <Button @click="createMsg">四种message类型</Button>
      <Button @click="createMsg2">通过函数创建message2</Button>
      <Button @click="destroyAll">销毁所有message</Button>
    </li>
    <li>
      <h1>Input组件</h1>
      <p>组件值 {{ test }}</p>
      <Input v-model="test" placeholder="prepend append" clearable>
        <template #prepend>Https://</template>
        <template #append>.com</template>
      </Input>
      <Input v-model="test" placeholder="prefix suffix" show-password>
        <template #prefix>
          <Icon icon="fa-user" />
        </template>
        <template #suffix>
          <Icon icon="fa-user" />
        </template>
      </Input>
      <div style="display: flex; align-items: center">
        <Input v-model="test" placeholder="大的 Input" size="large" />
        <Input v-model="test" placeholder="普通的 disabled" disabled />
        <Input v-model="test" placeholder="小的 number" size="small" type="number" />
      </div>
      <Input v-model="test" placeholder="可以是一个 Textarea" type="textarea" />
    </li>
    <li>
      <h1>Switch组件</h1>
      <div style="width: 300px;display: flex; align-items: center; justify-content: space-between">
        <Switch v-model="switchTtest" />
        <Switch v-model="switchTtest" active-text="on" inactive-text="off" />
        <Switch v-model="switchTtest" size="small" />
        <Switch
          v-model="switchTest2"
          size="large"
          active-value="right"
          inactive-value="wrong"
          active-text="right"
          inactive-text="wrong"
        />
      </div>
    </li>
    <li>
      <h1>Select组件</h1><span>选择值：{{ test }}</span>
      <Select v-model="selectTest" placeholder="基础选择器，请选择" :options="options2" />
    </li>
    <li>
      <h1>Form组件</h1>
      <div>
        <Form ref="formRef" :model="model" :rules="rules">
          <FormItem label="the email" prop="email">
            <Input v-model="model.email" />
          </FormItem>
          <FormItem label="the password" prop="password">
            <template #label="{label}">
              <Button type="info">{{ label }}</Button>
            </template>
            <Input v-model="model.password" type="password" />
          </FormItem>
          <FormItem prop="confirmPwd" label="confirm password">
            <Input v-model="model.confirmPwd" type="password" />
          </FormItem>
          <FormItem prop="name" label="name">
            <template #default="{validate}">
              <input v-model="model.name" type="string" @blur="validate()">
            </template>
          </FormItem>
          <div :style="{ textAlign: 'center' }">
            <Button type="primary" @click.prevent="submit">Submit</Button>
            <Button @click.prevent="reset">Reset</Button>
          </div>
        </Form>
        <p>form value:</p>

        <pre>{{ model }}</pre>
      </div>
    </li>
  </ul>
</template>

<style scoped>
</style>
