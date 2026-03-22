import { ref } from 'vue'
import { delay } from '@/utils/timeOut'
import { useAuth } from '@/composables/useAuth'
import type { CheckedMedium, Medium } from '@/types/media'
import { addCheckedMedia } from '@/services/perchAI/media'
import type { SelectedPrey } from '@/types/inat'

const auth = useAuth()

export function useIdentifyingSubmission() {
  const selectedPreys = ref<Array<SelectedPrey>>([])
  const submitting = ref<boolean>(false)
  const submitted = ref<boolean>(false)
  const error = ref<Error | null>(null)

  return {
    submitting,
    submitted,
    error,
  }
}
