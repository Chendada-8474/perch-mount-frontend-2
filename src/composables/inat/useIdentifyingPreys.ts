import { type InatPreyOption } from '@/types/options'
import { type IdentidiedPrey, type Individual } from '@/types/individuals'
import { ref } from 'vue'

import { useAuth } from '@/composables/useAuth'
import { addIdentifyPreys } from '@/services/perchAI/individuals'

const auth = useAuth()

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
