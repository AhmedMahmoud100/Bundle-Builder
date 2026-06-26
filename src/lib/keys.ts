import type { LineKey } from './types'

/**
 * Build the cart line key for a product (optionally a specific variant).
 * Variant-less products key by id; variant products key by `id:variantId`
 * so each color is tracked independently.
 */
export function lineKey(productId: string, variantId?: string): LineKey {
  return variantId ? `${productId}:${variantId}` : productId
}

/** Parse a line key back into its product id and optional variant id. */
export function parseLineKey(key: LineKey): {
  productId: string
  variantId?: string
} {
  const [productId, variantId] = key.split(':')
  return { productId, variantId }
}
