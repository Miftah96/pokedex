import axios from "axios"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
})

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonSpecies {
  id: number
  name: string
  order: number
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  hatch_counter: number
  has_gender_differences: boolean
  forms_switchable: boolean
  growth_rate: {
    name: string
    url: string
  }
  egg_groups: {
    name: string
    url: string
  }[]
  habitat: {
    name: string
    url: string
  } | null
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  sprites: {
    front_default: string
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  species: {
    name: string
    url: string
  }
}

export const getPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  try {
    const response = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`)
    return response.data
  } catch (error) {
    console.error("Error fetching Pokemon list:", error)
    throw error
  }
}

export const getPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
  try {
    const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching Pokemon details for ${nameOrId}:`, error)
    throw error
  }
}

export const getPokemonSpecies = async (nameOrId: string | number): Promise<PokemonSpecies> => {
  try {
    const response = await api.get<PokemonSpecies>(`/pokemon-species/${nameOrId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching Pokemon species for ${nameOrId}:`, error)
    throw error
  }
}

export default api
