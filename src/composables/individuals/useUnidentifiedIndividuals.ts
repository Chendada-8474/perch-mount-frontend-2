import { ref } from 'vue'

import { type UnidentifiedIndividualsQuery } from '@/types/media'
import type { Individual } from '@/types/individuals'
import { getUnidentifedIndividualsByQuery } from '@/services/perchAI/individuals'

export function useUnidentifiedIndividualsByQuery() {
  const individuals = ref<Individual[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (query: UnidentifiedIndividualsQuery) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await getUnidentifedIndividualsByQuery(query)
      individuals.value = result
    } catch (err) {
      error.value = err as Error
      individuals.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: individuals,
    isLoading,
    error,
    fetch,
  }
}
