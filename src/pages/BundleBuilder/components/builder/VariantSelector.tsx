import { VariantSwatch } from '../../../../components/VariantSwatch/VariantSwatch'
import type { Variant } from '../../../../lib/types'

interface VariantSelectorProps {
  variants: Variant[]
  activeVariantId: string | undefined
  onSelect: (variantId: string) => void
}

/** Row of color chips. Selecting one makes it the card's active variant. */
export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map((v) => (
        <VariantSwatch
          key={v.id}
          label={v.label}
          swatch={v.swatch}
          selected={v.id === activeVariantId}
          onSelect={() => onSelect(v.id)}
        />
      ))}
    </div>
  )
}
