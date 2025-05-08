import type React from "react"
import Link from "next/link"
import Image from "next/image"
import type { Pokemon } from "@/lib/api"

interface PokemonCardProps {
  pokemon: Pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const mainType = pokemon.types[0]?.type.name || "normal"
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="text-decoration-none">
      <div className={`pokemon-card ${mainType}-bg`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="pokemon-name">{formattedName}</h5>
              {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.type.name} className="pokemon-type">
                  {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                </span>
              ))}
            </div>
            <span className="pokemon-number">{formattedId}</span>
          </div>
          <div className="pokemon-image">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
