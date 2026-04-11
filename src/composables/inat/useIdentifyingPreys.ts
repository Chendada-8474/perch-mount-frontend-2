import { type InatPreyOption } from '@/types/options'
import { ref } from 'vue'

export function useIdentifyingPreys() {
  const preys = ref<Array<InatPreyOption>>([])
  const init = (length: number) => {
    preys.value = Array(length).fill(null)
  }

  return {
    data: preys,
    init,
  }
}

// TODO
export function useIdentifyingPreysSubmission() {
  const submitting = ref<boolean>(false)
  const submitted = ref<boolean>(false)
  const submit = async (preys: InatPreyOption[]) => {
    submitting.value = true

    submitted.value = true
  }
}
