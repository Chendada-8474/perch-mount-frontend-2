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
    <Button
      class="mt-6 mb-12"
      label="送出"
      @click="handleSubmitClicked()"
      :disabled="individuals.length === 0"
    />
  </div>

  <div class="fixed bottom-4 right-4 z-50">
    <Button icon="pi pi-search" @click="inatPreySelectorVisible = true" rounded />
  </div>

  <Drawer v-model:visible="inatPreySelectorVisible" header="Inat 獵物" position="right">
    <InatPreySelector @prey-selected="handlePreySelected"></InatPreySelector>
  </Drawer>

  <Dialog v-model:visible="dialogVisible" modal header="確認要送出嗎?" :style="{ width: '25rem' }">
    <div v-if="submitError">
      <Message severity="error">{{ submitError }}</Message>
    </div>
    <div v-else-if="submitted">
      <Message severity="success">資料已成功送出</Message>
      <div class="flex justify-end gap-2 mt-6">
        <router-link to="/app">
          <Button severity="secondary" label="回到首頁"></Button>
        </router-link>
        <Button label="繼續" @click="handleContinueClicked"></Button>
      </div>
    </div>
    <div v-else-if="submitting">submitting...</div>
    <div v-else>
      <span>你選擇了：</span>
      <ul>
        <li v-for="name in selectingPreyNames" class="list-disc">{{ name }}</li>
      </ul>
      <div class="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          label="取消"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="確認" @click="handleConfirmClicked"></Button>
      </div>
    </div>
  </Dialog>
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
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  query: UnidentifiedIndividualsQuery
}>()

const inatPreySelectorVisible = ref<boolean>(false)
const dialogVisible = ref(false)
const selectingPreyNames = ref<string[]>([])

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

  cancelAll()
}

const handPreyInputTried = () => {
  inatPreySelectorVisible.value = true
}

const handleSubmitClicked = () => {
  dialogVisible.value = true
  submitError.value = null
  submitting.value = false
  submitted.value = false
  selectingPreyNames.value = [
    ...new Set(
      identifyingPreys.value
        .filter((item): item is InatPreyOption => item !== null)
        .map((item) => item.name),
    ),
  ]
}

const handleContinueClicked = () => {
  router.go(0)
}
const handleConfirmClicked = () => {
  identifiedPreySubmit(identifyingPreys.value, individuals.value)
}
</script>
