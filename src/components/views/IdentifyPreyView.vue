<template>
  <div class="card">
    <div v-if="individuals.length === 0">沒有需要檢查的資料</div>
    <div v-else-if="!isIndividualsLoading" class="grid grid-cols-4 gap-4">
      <IdentifyingPreyIndividualCard
        v-for="(individual, index) of individuals"
        :individual="individual"
        v-model:checked="selects[index]"
        @selected="handleSelected(index)"
        @shift-selected="handleShiftSelected(index)"
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
import { useIdentifyingSubmission } from '@/composables/individuals/useIdentifyingSubmission'
import { useBooleansSelector } from '@/composables/useABooleansSelector'

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

const { submitting, submitted, error: submitError } = useIdentifyingSubmission()

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

onMounted(async () => {
  await fetchIndividuals(props.query)
  init(individuals.value.length)
})

const handleSelected = (mediumIndex: number) => {
  updatelast(mediumIndex)
}
const handleShiftSelected = (mediumIndex: number) => {
  selectFromLast(mediumIndex)
}

const handlePreySelected = (prey: null | InatPreyOption) => {
  console.log(prey) // TODO
}
</script>
