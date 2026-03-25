<template>
  <InputText v-model="preyName" class="my-2" type="text" size="small" @focusout="handleFocusout" />
  <p class="" v-for="option of options">
    {{ option.name }}
  </p>
</template>
<script setup lang="ts">
import { usePreyOptions } from '@/composables/inat/useSearchInatPreys'
import type { SelectedPrey } from '@/types/inat'

import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'prey-suggested', value: SelectedPrey): void
}>()

const preyName = ref<string>('')

const { data: options, isLoading, error, fetch } = usePreyOptions()

const handleFocusout = () => {
  fetch(preyName.value)
}
</script>
