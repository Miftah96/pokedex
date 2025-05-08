"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart } from "react-bootstrap-icons"
import type { Pokemon, PokemonSpecies } from "../lib/api"

interface PokemonDetailProps {
  pokemon: Pokemon
  species: PokemonSpecies
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, species }) => {
  const [activeTab, setActiveTab] = useState("about")
  const mainType = pokemon.types[0]?.type.name || "normal"
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  // Calculate total stats
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

  // Format height and weight
  const heightInMeters = pokemon.height / 10
  const heightInFeet = heightInMeters * 3.28084
  const feet = Math.floor(heightInFeet)
  const inches = Math.round((heightInFeet - feet) * 12)
  const formattedHeight = `${feet}'${inches}" (${heightInMeters.toFixed(2)} m)`

  const weightInKg = pokemon.weight / 10
  const weightInLbs = weightInKg * 2.20462
  const formattedWeight = `${weightInLbs.toFixed(1)} lbs (${weightInKg.toFixed(1)} kg)`

  // Get egg groups
  const eggGroups = species.egg_groups
    .map((group) => group.name.charAt(0).toUpperCase() + group.name.slice(1))
    .join(", ")

  // Calculate gender ratio
  const femaleRatio = species.gender_rate * 12.5
  const maleRatio = 100 - femaleRatio

  return (
    <div className="detail-container my-4">
      <div className={`detail-header ${mainType}-bg`}>
        <Link href="/" className="back-button text-decoration-none">
          <ArrowLeft />
        </Link>
        <button className="favorite-button">
          <Heart />
        </button>

        <h1 className="pokemon-name">{formattedName}</h1>
        <span className="pokemon-number">{formattedId}</span>

        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.type.name} className="pokemon-type">
            {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
          </span>
        ))}

        <div className="detail-image">
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            width={200}
            height={200}
            priority
          />
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-tabs">
          <div className={`detail-tab ${activeTab === "about" ? "active" : ""}`} onClick={() => setActiveTab("about")}>
            About
          </div>
          <div
            className={`detail-tab ${activeTab === "base-stats" ? "active" : ""}`}
            onClick={() => setActiveTab("base-stats")}
          >
            Base Stats
          </div>
          <div
            className={`detail-tab ${activeTab === "evolution" ? "active" : ""}`}
            onClick={() => setActiveTab("evolution")}
          >
            Evolution
          </div>
          <div className={`detail-tab ${activeTab === "moves" ? "active" : ""}`} onClick={() => setActiveTab("moves")}>
            Moves
          </div>
        </div>

        {activeTab === "about" && (
          <div className="about-content">
            <div className="row mb-2">
              <div className="col-4 stat-label">Species</div>
              <div className="col-8 stat-value">{species.name.charAt(0).toUpperCase() + species.name.slice(1)}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 stat-label">Height</div>
              <div className="col-8 stat-value">{formattedHeight}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 stat-label">Weight</div>
              <div className="col-8 stat-value">{formattedWeight}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 stat-label">Abilities</div>
              <div className="col-8 stat-value">
                {pokemon.abilities
                  .map((ability) =>
                    ability.ability.name
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" "),
                  )
                  .join(", ")}
              </div>
            </div>

            <h5 className="mt-4 mb-3">Breeding</h5>
            <div className="row mb-2">
              <div className="col-4 stat-label">Gender</div>
              <div className="col-8 stat-value">
                ♂ {maleRatio.toFixed(1)}% ♀ {femaleRatio.toFixed(1)}%
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4 stat-label">Egg Groups</div>
              <div className="col-8 stat-value">{eggGroups}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 stat-label">Egg Cycle</div>
              <div className="col-8 stat-value">{species.habitat?.name || "Unknown"}</div>
            </div>
          </div>
        )}

        {activeTab === "base-stats" && (
          <div className="stats-content">
            {pokemon.stats.map((stat) => {
              const statName = stat.stat.name.replace("-", " ")
              const formattedStatName =
                statName === "hp"
                  ? "HP"
                  : statName === "special attack"
                    ? "Sp. Atk"
                    : statName === "special defense"
                      ? "Sp. Def"
                      : statName.charAt(0).toUpperCase() + statName.slice(1)

              const percentage = (stat.base_stat / 255) * 100

              return (
                <div key={stat.stat.name} className="row align-items-center mb-2">
                  <div className="col-3 stat-label">{formattedStatName}</div>
                  <div className="col-2 stat-value">{stat.base_stat}</div>
                  <div className="col-7">
                    <div className={`stat-bar ${mainType}-bar`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )
            })}

            <div className="row align-items-center mb-2">
              <div className="col-3 stat-label">Total</div>
              <div className="col-2 stat-value">{totalStats}</div>
              <div className="col-7">
                <div className={`stat-bar ${mainType}-bar`} style={{ width: `${(totalStats / 600) * 100}%` }}></div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="mb-3">Type defenses</h5>
              <p className="text-muted">The effectiveness of each type on {formattedName}.</p>
              {/* Type effectiveness would go here */}
            </div>
          </div>
        )}

        {activeTab === "evolution" && (
          <div className="evolution-content">
            <p className="text-center text-muted">Evolution chain information is coming soon.</p>
          </div>
        )}

        {activeTab === "moves" && (
          <div className="moves-content">
            <p className="text-center text-muted">Moves information is coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonDetail
