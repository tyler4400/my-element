<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
import Progress from '@/components/Progress/Progress.tsx'
import type { UploadListProps } from '@/components/Upload/types.ts'
const { fileList, onRemove } = defineProps<UploadListProps>()


</script>

<template>
  <ul class="vk-upload-list">
    <template v-for="item in fileList" :key="item.uid">
      <li class="vk-upload-list__item">
        <span class="vk-file-name" :class="`file-name-${item.status}`">
          <Icon icon="file" />
          {{ item.name }}
        </span>
        <span class="vk-file-status">
          <Icon v-if="item.status === 'uploading'" icon="spinner" spin type="primary" />
          <Icon v-if="item.status === 'success'" icon="circle-check" type="success" />
          <Icon v-if="item.status === 'error'" icon="circle-xmark" type="danger" />
        </span>
        <span class="vk-file-action">
          <Icon icon="trash-can" type="primary" @click="onRemove(item)" />
        </span>
        <Progress v-if="item.status === 'uploading'" :percent="item.percent || 0" />
      </li>
    </template>
  </ul>
</template>

<style scoped>

</style>
