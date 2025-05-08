import Image from "next/image";
import styles from "./page.module.css";
import { getPokemonList, getPokemonDetails, type Pokemon } from "./lib/api"
import PokemonCard from "./components/PokemonCard"
import { ArrowLeft, List } from "react-bootstrap-icons"

async function getPokemons(): Promise<Pokemon[]> {
  const list = await getPokemonList(12, 0)
  const pokemonPromises = list.results.map((item) => getPokemonDetails(item.name))
  return Promise.all(pokemonPromises)
}

export default async function Home() {
  const pokemons = await getPokemons()

  return (
    <div className="pokedex-container my-4">
      <div className="pokedex-header">
        <button className="btn btn-link text-dark p-0">
          <ArrowLeft size={24} />
        </button>
        <div className="d-flex justify-content-between align-items-center w-100">
          <h1 className="mb-0">Pokedex</h1>
          <button className="btn btn-link text-dark p-0">
            <List size={24} />
          </button>
        </div>
      </div>

      <div className="pokedex-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}
