import type { Individual } from '@/types/individuals'
import type { UnidentifiedIndividualsQuery } from '@/types/media'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_INDIVIDUALS_PATH = '/api/perchai/individuals/'

export async function getUnidentifedIndividualsByQuery(
  query: UnidentifiedIndividualsQuery,
): Promise<Array<Individual>> {
  const paramsURL = buildUnidentifiedIndividualsQueryURL(query)
  return await perchAIApi.get<Array<Individual>>(`${ROOT_INDIVIDUALS_PATH}?${paramsURL.toString()}`)
}

function buildUnidentifiedIndividualsQueryURL(
  query: UnidentifiedIndividualsQuery,
): URLSearchParams {
  const params = new URLSearchParams()

  params.set('prey_status', 'unidentified')

  if (query.perch_mount_ids?.length) {
    params.set('perch_mount_ids', query.perch_mount_ids.join(','))
  }

  if (query.section_ids?.length) {
    params.set('section_ids', query.section_ids.join(','))
  }

  if (query.year) {
    params.set('year', String(query.year))
  }
  if (query.month) {
    params.set('year', String(query.month))
  }

  return params
}
