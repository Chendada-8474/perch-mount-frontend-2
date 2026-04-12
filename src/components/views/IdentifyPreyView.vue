<template>
  <div class="card">
    <div v-if="individuals.length === 0">沒有需要檢查的資料</div>
    <div v-else-if="!isIndividualsLoading" class="grid grid-cols-4 gap-4" @click.self="cancelAll()">
      <IdentifyingPreyIndividualCard
        v-for="(individual, index) of individuals"
        :individual="individual"
        :prey="identifyingPreys[index]"
        v-model:checked="selects[index]"
        @selected="handleSelected(index)"
        @shift-selected="handleShiftSelected(index)"
        @prey-input-tried="handPreyInputTried"
      ></IdentifyingPreyIndividualCard>
    </div>
    <div v-else><Loading></Loading></div>
  </div>

  <div class="fixed bottom-4 right-4 z-50">
    <Button icon="pi pi-search" @click="inatPreySelectorVisible = true" rounded />
  </div>

  <Drawer v-model:visible="inatPreySelectorVisible" header="Inat 獵物" position="right">
    <InatPreySelector @prey-selected="handlePreySelected"></InatPreySelector>
  </Drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUnidentifiedIndividualsByQuery } from '@/composables/individuals/useUnidentifiedIndividuals'
import type { UnidentifiedIndividualsQuery } from '@/types/media'
import type { InatPreyOption } from '@/types/options'

import InatPreySelector from '../forms/InatPreySelector.vue'
import Loading from '@/components/Loading.vue'
import IdentifyingPreyIndividualCard from '../cards/IdentifyingPreyIndividualCard.vue'
import { useIdentifyingPreysSubmission } from '@/composables/individuals/useIdentifyingSubmission'
import { useBooleansSelector } from '@/composables/useABooleansSelector'
import { useIdentifyingPreys } from '@/composables/inat/useIdentifyingPreys'

const props = defineProps<{
  query: UnidentifiedIndividualsQuery
}>()

const inatPreySelectorVisible = ref<boolean>(false)

const {
  data: individuals,
  isLoading: isIndividualsLoading,
  error: individualsError,
  fetch: fetchIndividuals,
} = useUnidentifiedIndividualsByQuery()

const {
  submitting,
  submitted,
  error: submitError,
  submit: identifiedPreySubmit,
} = useIdentifyingPreysSubmission()

const {
  selects,
  lastSelection,
  init,
  select,
  updatelast,
  selectFromLast,
  useTrueIndexes,
  cancelAll,
} = useBooleansSelector()

const { data: identifyingPreys, init: initIdentifyingPreys } = useIdentifyingPreys()

onMounted(async () => {
  await fetchIndividuals(props.query)
  init(individuals.value.length)
  initIdentifyingPreys(individuals.value.length)
})

const handleSelected = (mediumIndex: number) => {
  updatelast(mediumIndex)
}
const handleShiftSelected = (mediumIndex: number) => {
  selectFromLast(mediumIndex)
}

const handlePreySelected = (prey: null | InatPreyOption) => {
  selects.value.forEach((select, index) => {
    if (select && prey) {
      identifyingPreys.value[index] = {
        code: prey.code,
        name: prey.name,
        photoURL: prey.photoURL,
      }
    }
  })
}

const handPreyInputTried = () => {
  inatPreySelectorVisible.value = true
}
</script>
