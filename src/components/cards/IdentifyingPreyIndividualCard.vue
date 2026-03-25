<template>
  <Card>
    <template #title>
      <Checkbox binary v-model="localChecked" @click.shift="handleShiftClicked" />
    </template>
    <template #content>
      <div class="grid gap-4 grid-cols-2">
        <div class="col-span-2">
          <S3Medium :id="individual.medium_id" :is-image="true"></S3Medium>
        </div>
        <div>
          <InputText class="my-2" type="text" size="small" />
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import type { Individual } from '@/types/individuals'

import S3Medium from '../S3Medium.vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  individual: Individual
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
  (e: 'selected'): void
  (e: 'shift-selected'): void
}>()

const localChecked = computed({
  get: () => props.checked,
  set: (val: boolean) => emit('update:checked', val),
})

watch(localChecked, (newVal, oldVal) => {
  if (newVal) {
    emit('selected')
  }
})

const handleShiftClicked = (event: MouseEvent) => {
  if (!localChecked.value) {
    emit('shift-selected')
  }
}
</script>
