<template>
  <Card>
    <template #title>辨識獵物</template>
  </Card>
</template>
<script setup lang="ts">
import type { UnidentifiedIndividualsQuery } from '@/types/media'

const props = defineProps<{
  query: UnidentifiedIndividualsQuery
}>()
</script>
