<script setup>
import Upload from '@/components/Upload/Upload.vue'
import Icon from '@/components/Icon/Icon.vue'
const defaultFileList = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
</script>
<template>
  <h1>Upload组件</h1><span />
  <Upload
    :default-file-list="defaultFileList"
    action="https://mock.mengxuegu.com/mock/67853e8f8ee02010dd5e262e/example/upload"
    multiple
    :data="{hhhha: '123'}"
    :on-progress="(percentage, file) => console.log('on-progress', percentage, file)"
    :on-success="(data, file) => console.log('on-success', data, file)"
    :on-error="(error, file) => console.log('on-error', error, file)"
  />
  <h2>拖动上传</h2>
  <Upload
    action="https://mock.mengxuegu.com/mock/67853e8f8ee02010dd5e262e/example/upload"
    multiple
    :data="{hhhha: '123'}"
    drag
  >
    <p>点击或者拖拽上传</p>
  </Upload>
  <h2>自定义slot</h2>
  <Upload
    action="https://mock.mengxuegu.com/mock/67853e8f8ee02010dd5e262e/example/upload"
    multiple
    :data="{hhhha: '123'}"
  >
    <template #default="{ handle }">
      <div style="border: 1px solid #79bbff" @click="handle">
        <Icon icon="upload" type="primary" /><span>点此上传</span>
      </div>
    </template>
  </Upload>
</template>
