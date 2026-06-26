import { Badge } from '../../../../components/Badge/Badge'
import { Price } from '../../../../components/Price/Price'
import { ProductImage } from '../../../../components/ProductImage/ProductImage'
import { QuantityStepper } from '../../../../components/QuantityStepper/QuantityStepper'
import { cn } from '../../../../lib/cn'
import type { Product } from '../../../../lib/types'
import { useSystemBuilder } from '../../../../hooks/useSystemBuilder'
import { VariantSelector } from './VariantSelector'

interface ProductCardProps {
  product: Product
}

/**
 * Builder product card. The quantity stepper is bound to the *active* variant,
 * so each color keeps its own count; switching color shows that color's count.
 * A card with quantity > 0 (for the active variant) is shown in its selected
 * (highlighted-border) state.
 */
export function ProductCard({ product }: ProductCardProps) {
  const {
    activeVariantOf,
    setActiveVariant,
    getQuantity,
    setQuantity,
  } = useSystemBuilder()

  const hasVariants = !!product.variants?.length
  const activeVariantId = hasVariants ? activeVariantOf(product.id) : undefined
  const quantity = getQuantity(product.id, activeVariantId)
  const selected = quantity > 0

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-card bg-bg p-3 transition-colors',
        // Borderless until selected; selected shows the primary border.
        selected ? 'border border-primary' : 'border border-transparent',
      )}
    >
      {product.badge && (
        <Badge className="absolute left-3 top-3 z-10">{product.badge}</Badge>
      )}

      <ProductImage
        src={product.image}
        alt={product.title}
        className="mb-3 aspect-square w-full"
      />

      <h3 className="text-sm font-bold text-text">{product.title}</h3>
      {product.description && (
        <p className="mt-1 text-xs leading-snug text-text-muted">
          {product.description}{' '}
          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              className="font-semibold text-primary hover:underline"
            >
              Learn More
            </a>
          )}
        </p>
      )}

      {hasVariants && (
        <div className="mt-3">
          <VariantSelector
            variants={product.variants!}
            activeVariantId={activeVariantId}
            onSelect={(id) => setActiveVariant(product.id, id)}
          />
        </div>
      )}

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <QuantityStepper
          value={quantity}
          onChange={(q) => setQuantity(product.id, activeVariantId, q)}
          size="sm"
          aria-label={`${product.title} quantity`}
        />
        <Price
          price={product.price}
          compareAt={product.compareAt}
          unit={product.unit}
          size="md"
          layout="stacked"
          context="card"
        />
      </div>
    </div>
  )
}
