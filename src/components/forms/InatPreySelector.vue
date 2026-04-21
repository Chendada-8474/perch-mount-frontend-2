<template>
  <InputText
    placeholder="搜尋獵物名稱"
    v-model="preyName"
    class="my-2"
    type="text"
    size="small"
    @focusout="handleFocusout"
  />
  <p class="mt-6">搜尋結果：</p>
  <Listbox
    v-model="selected"
    :options="options"
    optionLabel="name"
    class="w-full md:w-56"
    listStyle="max-height:250px"
  >
    <template #option="slotProps">
      <div class="flex items-center">
        <img
          :alt="slotProps.option.name"
          :src="slotProps.option.photoURL"
          :class="`mr-2`"
          style="width: 18px"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Listbox>
  <Button label="選擇" class="mt-6" @click="handleSubmitClicked" />
</template>
<script setup lang="ts">
import { usePreyOptions } from '@/composables/inat/useSearchInatPreys'
import type { InatPreyOption } from '@/types/options'

import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'prey-selected', value: null | InatPreyOption): void
}>()

const preyName = ref<string>('')
const selected = ref<null | InatPreyOption>(null)

const { data: options, isLoading, error, fetch } = usePreyOptions()

const handleFocusout = () => {
  if (!preyName.value) {
    return
  }
  fetch(preyName.value)
}

const handleSubmitClicked = () => {
  emit('prey-selected', selected.value)
}
</script>
