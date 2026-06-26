import { VariantSwatch } from '../../../../components/VariantSwatch/VariantSwatch'
import type { Variant } from '../../../../lib/types'

interface VariantSelectorProps {
  variants: Variant[]
  activeVariantId: string | undefined
  /** Per-variant quantity, used to flag the "in cart" highlight. */
  quantityOf: (variantId: string) => number
  onSelect: (variantId: string) => void
}

/** Row of color chips. Selecting one makes it the card's active variant. */
export function VariantSelector({
  variants,
  activeVariantId,
  quantityOf,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map((v) => (
        <VariantSwatch
          key={v.id}
          label={v.label}
          thumb={v.thumb}
          swatch={v.swatch}
          selected={v.id === activeVariantId}
          inCart={quantityOf(v.id) > 0}
          onSelect={() => onSelect(v.id)}
        />
      ))}
    </div>
  )
}
