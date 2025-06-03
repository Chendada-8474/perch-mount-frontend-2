import { inatApi } from './api'

export const searchPreyByName = async (name: string): Promise<any> => {
  return inatApi.get(`/taxa?q=${name}&is_above=1`)
}
