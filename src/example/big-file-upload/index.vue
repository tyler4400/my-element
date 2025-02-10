<script setup lang="ts">
import { createMessage } from '@/components/Message/message.ts'
import { type UploadFile, type VerifyUploadResult } from '@/example/big-file-upload/types.ts'
import Button from '@/components/Button'
import { reactive, watchEffect } from 'vue'
import Progress from '@/components/Progress/Progress.tsx'
import UploadList from '@/components/Upload/UploadList.vue'
import { type UploadFile as UploadFileAnother } from '@/components/Upload/types.ts'
import axios, { type AxiosProgressEvent } from 'axios'

// chunk size 切片大小 1mb
const SIZE = 1 * 1024 * 1024

const uploadFile: UploadFile = reactive({})
const chunks: UploadFile[] = reactive([])
const updateChunkList = (file: UploadFile, updateObj: Partial<UploadFile>) => {
  const index = chunks.findIndex(item => item.uid === file.uid)
  chunks.splice(index, 1, { ...chunks[index], ...updateObj })
}

watchEffect(() => {
  if (!chunks.length || !uploadFile.raw) {
    return
  }
  const loaded = chunks
    .map(item => (item.size as number) * (item.percent as number))
    .reduce((pre, curr) => pre + curr, 0)
  uploadFile.percent = parseInt((loaded / (uploadFile.size as number)).toFixed(2))
})

const handleFileChange = (e: Event) => {
  const fileInput = e.target as HTMLInputElement
  const files = fileInput.files
  if (!files || !files.length) {
    createMessage({ message: '未选择文件！', offset: 20, type: 'warning' })
    return
  }
  resetData()
  const file = files[0]
  uploadFile.uid = Date.now() + file.name || 'big-upload-file'
  uploadFile.status = 'ready'
  uploadFile.name = file.name
  uploadFile.size = file.size
  uploadFile.percent = 0
  uploadFile.raw = file
}



const handleUpload = async () => {
  if (!uploadFile.raw) {
    createMessage({ message: '未选择文件！', offset: 20, type: 'warning' })
    return
  }
  uploadFile.status = 'uploading'
  const fileChunkList = creatFileChunks(uploadFile.raw as File)
  uploadFile.hash = await calculateHash(fileChunkList)
  // 验证是否已上传
  const {shouldUpload, uploadedList} = await verifyUpload(uploadFile.name as string, uploadFile.hash)
  if (!shouldUpload) {
    createMessage({ message: '文件已经上传过了', type: 'success'})
    uploadFile.status = 'success'
    uploadFile.percent = 100
    return
  }
  fileChunkList.forEach((chunk, index) => {
    const hash = uploadFile.hash + '-' + index
    const isUploaded = uploadedList.includes(hash)
    chunks.push({
      uid: uploadFile.hash + '-' + index,
      name: uploadFile.name + '-' + index,
      hash, // 其实这里可以单独计算hash
      size: chunk.size,
      raw: chunk,
      status: isUploaded ? 'success' : 'ready',
      percent: isUploaded ? 100 : 0,
      hashPercent: 100,
      controller: new AbortController()
    })
  })
  await uploadChunks(chunks)
}

const creatFileChunks = (file: File, size = SIZE) => {
  const chunks: Blob[] = []
  let curr = 0
  while (curr < file.size) {
    chunks.push(file.slice(curr, size + curr))
    curr += size
  }
  return chunks
}

const calculateHash = (fileChunkList: Blob[]): Promise<string> => {
  return new Promise(resolve => {
    const worker = new Worker('/hash.js')
    worker.postMessage({ fileChunkList })
    worker.onmessage = e => {
      // console.log('worker.onmessage', e)
      const { percentage, hash } = e.data
      uploadFile.hashPercent = percentage
      if (hash) {
        resolve(hash)
      }
    }
  })
}

const uploadChunks = async (chunkList: UploadFile[]) => {
  const requestList: Promise<void>[] = chunkList.filter(chunk => chunk.status !== 'success')
    .map((chunk) => {
      const formData = new FormData()
      formData.append('chunk', chunk.raw as Blob)
      formData.append('hash', chunk.hash as string)
      formData.append('filename', uploadFile.name as string)
      formData.append('fileHash', uploadFile.hash as string)

      return axios.post('http://localhost:3000', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: chunk.controller?.signal,
        // withCredentials: true,
        onUploadProgress: (event: AxiosProgressEvent) => {
          if (event.total) {
            const percentage = Math.round((event.loaded / event.total) * 100)
            if (percentage < 100) {
              updateChunkList(chunk, { percent: percentage, status: 'uploading' })
            }
          }
        }
      }).then(response => {
        updateChunkList(chunk, {status: 'success', response: response.data, percent: 100 })
      }).catch(error => {
        updateChunkList(chunk, { status: 'error', error })
      })
    })

  await Promise.all(requestList)
  // 通知服务端合并切片. 这里未做错误边界处理， 还以可能某个chunk上传失败
  await mergeRequest(uploadFile.name as string, uploadFile.hash as string)
  uploadFile.status = 'success' // 未考虑错误边界
}


const resetData = () => {
  for (const key of Object.keys(uploadFile)) {
    const _key = key as keyof UploadFile
    uploadFile[_key] = null
  }
  chunks.splice(0, chunks.length)
}

// 通知服务端合并切片
const mergeRequest = async (filename: string, fileHash: string) => {
  const data = JSON.stringify({
    size: SIZE,
    fileHash,
    filename,
  })
  await axios.post('http://localhost:3000/merge',data, {
    headers: {
      'content-type': 'application/json'
    },
  })
  createMessage({ message: 'upload success, check /target directory', type: 'success'})
  // uploadFile.status = 'success'
}

// 根据 hash 验证文件是否曾经已经被上传过
// 没有才进行上传
// verify that the file has been uploaded based on the hash
// skip if uploaded
const verifyUpload = async (filename: string, fileHash: string): Promise<VerifyUploadResult> => {
  const postData = JSON.stringify({
    fileHash,
    filename,
  })
  const { data } = await axios.post('http://localhost:3000/verify',postData, {
    headers: {
      'content-type': 'application/json'
    },
  })
  return data
}

const handlePause = () => {
  uploadFile.status = 'ready'
  chunks.forEach(chunk => {
    if (chunk.status !== 'success') {
      chunk.controller?.abort()
    }
  })
  createMessage({message: '已暂停', type: 'success'})
}

const handleResume = () => {
  uploadFile.status = 'uploading'
  uploadChunks(chunks)
  createMessage({message: '已继续上传', type: 'success'})
}

const handleRemove = () => {
  createMessage({message: '点击了remove， 实际无事发生'})
}

</script>

<template>
  <div>
    <input type="file" :multiple="false" @change="handleFileChange">
    <Button
      :loading="uploadFile.status === 'uploading'"
      @click="handleUpload"
    >
      开始上传
    </Button>
    <Button
      :disabled="uploadFile.status !== 'uploading'"
      @click="handlePause"
    >
      暂停
    </Button>
    <Button
      :disabled="['uploading', 'success'].includes(uploadFile.status as string)"
      @click="handleResume"
    >
      恢复上传
    </Button>
    <div>使用worker计算hash进度: {{ uploadFile.hash }}</div>
    <div class="hash-progress">
      <Progress :percent="uploadFile.hashPercent || 0" />
    </div>
    <div>大文件总体上传进度</div>
    <Progress :percent="uploadFile.percent || 0" />
    <div>切片上传进度</div>
    <Upload-list :file-list="chunks as UploadFileAnother[]" :on-remove="handleRemove" />
  </div>
  {{ uploadFile }}
</template>

<style scoped>
.hash-progress {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
