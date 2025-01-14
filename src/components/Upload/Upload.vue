<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { useTemplateRef } from 'vue'
import type { UploadProps } from '@/components/Upload/types.ts'
import axios, { type AxiosProgressEvent } from 'axios'

defineOptions({
  name: 'VKUpload',
})

const { action, onProgress, onSuccess, onError, beforeUpload } = defineProps<UploadProps>()

const fileInputEl = useTemplateRef('input')
const handleClick = () => {
  if (fileInputEl.value) {
    fileInputEl.value.click()
  }
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
  const formData = new FormData()
  formData.append('file', file)
  axios.post(action, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event: AxiosProgressEvent) => {
      console.log('upload progress', event)
      if (event.total) {
        const percentage = Math.round((event.loaded / event.total) * 100)
        if (percentage < 100) {
          onProgress?.(percentage, file)
        }
      }
    }
  }).then(response => {
    console.log('upload response', response)
    onSuccess?.(response.data, file)
  }).catch(error => {
    console.error('upload error', error)
    onError?.(error, file)
  })
}

</script>

<template>
  <div class="vk-upload">
    <Button type="primary" @click="handleClick">Upload File</Button>
    <input
      ref="input"
      type="file"
      class="vk-file-input"
      style="display: none"
      @change="handleFileChange"
    >
  </div>
</template>

<style scoped>

</style>
