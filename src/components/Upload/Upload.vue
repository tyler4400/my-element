<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { reactive, useTemplateRef } from 'vue'
import type { UploadFile, UploadProps } from '@/components/Upload/types.ts'
import axios, { type AxiosProgressEvent } from 'axios'
import UploadList from '@/components/Upload/UploadList.vue'
// import DropZone from '@/components/DropZone/DropZone.ts'
import DropZone from '@/components/DropZone/DropZone.vue'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({
  name: 'VKUpload',
})

const {
  action,
  multiple,
  onProgress,
  onSuccess,
  onError,
  beforeUpload,
  onChange,
  defaultFileList = [],
  onRemove,
  name = 'file',
  headers,
  data,
  withCredentials,
  accept,
  drag,
} = defineProps<UploadProps>()

const fileInputEl = useTemplateRef('input')
const handleClick = () => {
  if (fileInputEl.value) {
    fileInputEl.value.click()
  }
}

const fileList = reactive<UploadFile[]>(defaultFileList)
const updateFileList = (file: UploadFile, updateObj: Partial<UploadFile>) => {
  const index = fileList.findIndex(item => item.uid === file.uid)
  fileList.splice(index, 1, { ...fileList[index], ...updateObj })
  console.log('updateFileList', fileList)
}
const handleRemove = (file: UploadFile) => {
  const index = fileList.findIndex(item => item.uid === file.uid)
  fileList.splice(index, 1)
  onRemove?.(file)
}

const handleFileChange = (e: Event) => {
  console.log('handleFileChange', e)
  const fileInput = e.target as HTMLInputElement
  const files = fileInput.files
  if (!files || !files.length) return
  uploadFiles(files)
  if (fileInputEl.value) {
    fileInputEl.value.value = ''
  }
}

const uploadFiles = (files: FileList) => {
  const postFiles = Array.from(files)
  for (const file of postFiles) {
    if (typeof beforeUpload === 'function'){
      const result = beforeUpload(file)
      if (result instanceof Promise){
        result.then(res => {
          postFile(res)
        })
      } else if (result) {
        postFile(file)
      }
    } else {
      postFile(file)
    }
  }
}

const postFile = (file: File) => {
  const _file: UploadFile = {
    uid: Date.now() + file.name || 'vk-upload-file',
    status: 'ready',
    name: file.name,
    size: file.size,
    raw: file
  }
  fileList.unshift(_file)
  const formData = new FormData()
  formData.append(name, file)
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }
  axios.post(action, formData, {
    headers: { ...headers, 'Content-Type': 'multipart/form-data' },
    withCredentials,
    onUploadProgress: (event: AxiosProgressEvent) => {
      console.log('upload progress', event)
      if (event.total) {
        const percentage = Math.round((event.loaded / event.total) * 100)
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          onProgress?.(percentage, file)
        }
      }
    }
  }).then(response => {
    console.log('upload response', response)
    updateFileList(_file, {status: 'success', response: response.data, percent: 100 })
    onSuccess?.(response.data, file)
    onChange?.(file)
  }).catch(error => {
    console.error('upload error', error)
    updateFileList(_file, { status: 'error', error })
    onError?.(error, file)
    onChange?.(file)
  })
}

</script>

<template>
  <div class="vk-upload">
    <template v-if="drag">
      <DropZone is="p" @file-drop="uploadFiles" @click="handleClick">
        <slot>
          <Icon icon="upload" type="primary" size="3x" />
          <br>
          <p>Drag file over to upload</p>
        </slot>
      </DropZone>
    </template>
    <template v-else>
      <slot :handle="handleClick">
        <Button type="primary" @click="handleClick">Upload File</Button>
      </slot>
    </template>
    <input
      ref="input"
      type="file"
      :multiple="multiple"
      :accept="accept"
      class="vk-file-input"
      style="display: none"
      @change="handleFileChange"
    >
    <Upload-list :file-list="fileList" :on-remove="handleRemove" />
  </div>
</template>

<style scoped>

</style>
