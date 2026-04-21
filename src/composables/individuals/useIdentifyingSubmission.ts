import { ref } from 'vue'
import { delay } from '@/utils/timeOut'
import { useAuth } from '@/composables/useAuth'
import type { CheckedMedium, Medium } from '@/types/media'
import { type InatPreyOption } from '@/types/options'
import { addCheckedMedia } from '@/services/perchAI/media'
import type { SelectedPrey } from '@/types/inat'
import { type IdentifiedPrey, type Individual } from '@/types/individuals'
import { addIdentifyPreys } from '@/services/perchAI/individuals'

const auth = useAuth()

export function useIdentifyingPreysSubmission() {
  const submitting = ref<boolean>(false)
  const submitted = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const submit = async (preys: InatPreyOption[], individuals: Individual[]) => {
    submitting.value = true
    const identifiedPreys = convertPreyOptionsToIdentifiedPreys(preys, individuals)
    console.log(identifiedPreys)
    try {
      await addIdentifyPreys(identifiedPreys)
    } catch (err) {
      error.value = err as Error
    } finally {
      submitting.value = false
    }
    submitted.value = true
  }

  return {
    submitting,
    submitted,
    error,
    submit,
  }
}

function convertPreyOptionsToIdentifiedPreys(
  preys: (InatPreyOption | null)[],
  individuals: Individual[],
): IdentifiedPrey[] {
  return preys.map((prey, index) => ({
    individual_id: individuals[index].id,
    inaturalist_taxa_id: prey ? prey.code : null,
    identifier_id: auth.currentUser!.id,
  }))
}
