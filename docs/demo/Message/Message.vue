<script setup>
import Button from '@/components/Button/Button.vue'
import { createMessage, destroyAll } from '@/components/Message/message'

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
</script>
<template>
  <Button @click="createMsg">四种message类型</Button>
  <Button @click="createMsg2">通过函数创建message2</Button>
  <Button @click="destroyAll">销毁所有message</Button>
</template>
