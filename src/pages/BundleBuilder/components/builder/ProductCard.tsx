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
        'relative flex h-full flex-col gap-3 rounded-card border-2 bg-bg p-3 transition-colors',
        // ≥lg: horizontal layout (image beside content) with extra right padding.
        'lg:flex-row lg:pr-6',
        // Borderless until selected; selected shows the 2px primary border.
        selected ? 'border-primary-border' : 'border-transparent',
      )}
    >
      {product.badge && (
        <Badge className="absolute left-3 top-3 z-10">{product.badge}</Badge>
      )}

      {/* Image — on top (vertical) by default; beside content at ≥lg. */}
      <ProductImage
        src={product.image}
        alt={product.title}
        className="aspect-square w-full shrink-0 self-center lg:w-[30%] lg:max-w-28"
      />

      {/* Content column — centered against the image (horizontal mode, no variants) */}
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col',
          !hasVariants && 'lg:justify-center',
        )}
      >
        <h3 className="text-sm font-bold text-text">{product.title}</h3>
        {product.description && (
          <p className="mt-1 text-xs leading-snug text-text-muted">
            {product.description}{' '}
            {product.learnMoreUrl && (
              <a
                href={product.learnMoreUrl}
                className="whitespace-nowrap text-xs font-medium text-link underline"
              >
                Learn More
              </a>
            )}
          </p>
        )}

        {hasVariants && (
          <div className="mt-2">
            <VariantSelector
              variants={product.variants!}
              activeVariantId={activeVariantId}
              quantityOf={(variantId) => getQuantity(product.id, variantId)}
              onSelect={(id) => setActiveVariant(product.id, id)}
            />
          </div>
        )}

        <div
          className={cn(
            'flex items-center justify-between gap-2 pt-2',
            // Bottom-pin only when variants push the row down; otherwise let
            // the counter sit right under the description (no big gap).
            hasVariants && 'mt-auto',
          )}
        >
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
    </div>
  )
}
