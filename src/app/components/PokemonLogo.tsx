import type React from "react"
import Image from "next/image"

interface PokemonLogoProps {
  className?: string
}

const PokemonLogo: React.FC<PokemonLogoProps> = ({ className = "" }) => {
  return (
    <div className={`pokemon-logo-watermark ${className}`}>
      <Image src="/pokemon-logo.png" alt="Pokemon Logo" width={200} height={74} className="pokemon-logo-image" />
    </div>
  )
}

export default PokemonLogo
