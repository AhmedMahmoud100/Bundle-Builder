import { Price } from '../../../../components/Price/Price'
import { ProductImage } from '../../../../components/ProductImage/ProductImage'
import { QuantityStepper } from '../../../../components/QuantityStepper/QuantityStepper'
import { useSystemBuilder } from '../../../../hooks/useSystemBuilder'
import type { ReviewLine as ReviewLineData } from '../../../../lib/types'

interface ReviewLineProps {
  line: ReviewLineData
}

/**
 * One summary row: thumbnail, name (+ variant), its own quantity stepper
 * (kept in sync with the card), and stacked price. Required items show a
 * disabled stepper and cannot be removed.
 */
export function ReviewLine({ line }: ReviewLineProps) {
  const { setQuantity } = useSystemBuilder()
  const { product, variant, quantity } = line
  const name = variant ? `${product.title} — ${variant.label}` : product.title
  const required = !!product.required

  return (
    <div className="flex items-center gap-3 py-2">
      <ProductImage
        src={product.image}
        alt={name}
        className="h-9 w-9 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text">
          {product.title}
          {variant && (
            <span className="font-normal text-text-muted"> · {variant.label}</span>
          )}
        </p>
      </div>

      <QuantityStepper
        value={quantity}
        onChange={(q) => setQuantity(product.id, variant?.id, q)}
        min={required ? quantity : 0}
        disabled={required}
        size="sm"
        aria-label={`${name} quantity`}
      />

      <div className="w-20 text-right">
        <Price
          price={product.price}
          compareAt={product.compareAt}
          unit={product.unit}
          size="sm"
          layout="stacked"
          context="review"
        />
      </div>
    </div>
  )
}
