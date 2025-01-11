<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'
import Button from '@/components/Button/Button.vue'
const test = ref('1')
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]
const click = () => {
  if (test.value === '4') {
    test.value = '1'
  } else {
    test.value = +test.value + 1 + ''
  }
}
</script>
<template>
  <Select v-model="test" placeholder="基础选择器，请选择" :options="options2" />
  <span>  值：{{ test }}</span>
  <Button @click="click">改变选择的值</Button>
</template>
