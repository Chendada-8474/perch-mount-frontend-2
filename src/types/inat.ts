import type { SelectedOption } from './options'

export interface InatTaxa {
  id: number
  rank: string
  rank_level: number
  iconic_taxon_id: number
  ancestor_ids: number[]
  is_active: boolean
  name: string
  parent_id: number
  ancestry: string
  extinct: boolean
  default_photo: {
    id: number
    license_code: string
    attribution: string
    url: string
    original_dimensions: {
      height: number
      width: number
    }
    flags: any[]
    attribution_name: string
    square_url: string
    medium_url: string
  }
  taxon_changes_count: number
  taxon_schemes_count: number
  observations_count: number
  flag_counts: {
    resolved: number
    unresolved: number
  }
  current_synonymous_taxon_ids: number[] | null
  atlas_id: number | null
  complete_species_count: number | null
  wikipedia_url: string
  complete_rank: string
  matched_term: string
  iconic_taxon_name: string
  preferred_common_name: string
}

export interface SelectedPrey extends SelectedOption {
  defaultPhotoUrl: string
  iconicTaxonName: string
}
