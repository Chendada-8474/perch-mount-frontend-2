import { searchPreyByName } from '@/services/inat/taxa'
import type { InatTaxa } from '@/types/inat'
import { type InatPreyOption } from '@/types/options'
import { ref } from 'vue'

export function useBehaviorOptions() {
  const preyOptions = ref<Array<InatPreyOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (name: string) => {
    isLoading.value = true
    error.value = null
    try {
      const taxon = await searchPreyByName(name)
      preyOptions.value = convertToInatPreyOptions(taxon.results as InatTaxa[])
    } catch (err) {
      error.value = err as Error
      preyOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: preyOptions,
    isLoading,
    error,
    fetch,
  }
}

function convertToInatPreyOptions(data: InatTaxa[]): InatPreyOption[] {
  return data.map((item) => ({
    code: item.id,
    name: item.matched_term,
  }))
}
