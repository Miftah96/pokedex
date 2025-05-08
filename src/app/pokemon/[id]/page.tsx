import { getPokemonDetails, getPokemonSpecies } from "../../lib/api"
import PokemonDetail from "../../components/PokemonDetail"
import { notFound } from "next/navigation"

interface PokemonPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PokemonPageProps) {
  try {
    const pokemon = await getPokemonDetails(params.id)
    const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    return {
      title: `${formattedName} | Pokedex`,
      description: `View details about ${formattedName} including stats, abilities, and more.`,
    }
  } catch (error) {
    return {
      title: "Pokemon Not Found | Pokedex",
      description: "The requested Pokemon could not be found.",
    }
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  try {
    const pokemon = await getPokemonDetails(params.id)
    const species = await getPokemonSpecies(params.id)

    return <PokemonDetail pokemon={pokemon} species={species} />
  } catch (error) {
    notFound()
  }
}
