<template>
  <Image v-if="!medium" :src="'/images/demo_media.jpg'" />
  <Image
    v-else-if="medium.medium_type === 'image'"
    :src="getS3MediumLink(medium.s3_file_name)"
    alt="Image"
    preview
  />
  <video v-else :src="getS3MediumLink(medium.s3_file_name)" controls></video>
</template>

<script setup lang="ts">
import { getS3MediumLink } from '@/composables/media/s3'
import type { Medium } from '@/types/media'

const props = defineProps<{
  medium: Medium | null
}>()
</script>
