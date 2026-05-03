<template>
  <Card>
    <template #title>
      <Checkbox binary v-model="localChecked" @click.shift="handleShiftClicked" />
    </template>
    <template #content>
      <div class="grid gap-4 grid-cols-2">
        <div class="col-span-2">
          <!-- TODO: This need to find a solution to get medium object then put in here -->
          <S3Medium :medium="null"></S3Medium>
        </div>
        <div class="col-span-2">
          <Chip
            v-if="!prey"
            class="cursor-text"
            label="please select prey"
            @click="preyInputTried"
          />
          <Chip
            v-else
            class="cursor-text"
            :label="prey.name"
            :image="prey.photoURL"
            @click="preyInputTried"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import type { Individual } from '@/types/individuals'
import type { InatPreyOption } from '@/types/options'
import type { Medium } from '@/types/media'

import S3Medium from '../S3Medium.vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  individual: Individual
  prey: InatPreyOption | null
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
  (e: 'update:prey', value: InatPreyOption): void
  (e: 'selected'): void
  (e: 'shift-selected'): void
  (e: 'prey-input-tried'): void
}>()

const prey = computed({
  get: () => props.prey,
  set: (val: InatPreyOption) => emit('update:prey', val),
})

const localChecked = computed({
  get: () => props.checked,
  set: (val: boolean) => emit('update:checked', val),
})

watch(localChecked, (newVal, oldVal) => {
  if (newVal) {
    emit('selected')
  }
})

const preyInputTried = () => {
  emit('prey-input-tried')
  localChecked.value = true
}

const handleShiftClicked = (event: MouseEvent) => {
  if (!localChecked.value) {
    emit('shift-selected')
  }
}
</script>
