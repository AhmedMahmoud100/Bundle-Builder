import type {
  Catalog,
  CartState,
  Category,
  Product,
  ReviewLine,
  StepId,
} from './types'
import { parseLineKey } from './keys'
import { round2 } from './pricing'

/** Index products by id for O(1) lookup. */
export function indexProducts(catalog: Catalog): Map<string, Product> {
  return new Map(catalog.products.map((p) => [p.id, p]))
}

/**
 * Derive every review line (one per LineKey with quantity > 0), expanded with
 * its product, optional variant, and per-line totals. Variants with a count
 * above zero each become their own line — switching the active variant on a
 * card never removes a previously-added variant from the summary.
 */
export function deriveReviewLines(
  catalog: Catalog,
  cart: CartState,
): ReviewLine[] {
  const byId = indexProducts(catalog)
  const lines: ReviewLine[] = []

  for (const [key, quantity] of Object.entries(cart.quantities)) {
    if (!quantity || quantity <= 0) continue
    const { productId, variantId } = parseLineKey(key)
    const product = byId.get(productId)
    if (!product) continue
    const variant = variantId
      ? product.variants?.find((v) => v.id === variantId)
      : undefined

    const compareUnit = product.compareAt ?? product.price
    lines.push({
      key,
      product,
      variant,
      quantity,
      lineTotal: round2(product.price * quantity),
      compareTotal: round2(compareUnit * quantity),
    })
  }

  // Stable display order: follow catalog product order, then variant order.
  const productOrder = new Map(catalog.products.map((p, i) => [p.id, i]))
  lines.sort((a, b) => {
    const pa = productOrder.get(a.product.id) ?? 0
    const pb = productOrder.get(b.product.id) ?? 0
    if (pa !== pb) return pa - pb
    return (a.variant?.label ?? '').localeCompare(b.variant?.label ?? '')
  })

  return lines
}

/** Group review lines under their review-panel category, preserving order. */
export function groupByCategory(
  lines: ReviewLine[],
): { category: Category; lines: ReviewLine[] }[] {
  const order: Category[] = ['cameras', 'sensors', 'accessories', 'plan']
  const groups = new Map<Category, ReviewLine[]>()
  for (const line of lines) {
    const list = groups.get(line.product.category) ?? []
    list.push(line)
    groups.set(line.product.category, list)
  }
  return order
    .filter((c) => groups.has(c))
    .map((category) => ({ category, lines: groups.get(category)! }))
}

/**
 * Count distinct selected products in a step — the "N selected" badge.
 * Distinct *products* (not variant-lines): adding both White and Black of the
 * same camera counts once. Required items are not counted as a user selection.
 */
export function selectedCount(
  catalog: Catalog,
  cart: CartState,
  step: StepId,
): number {
  const selected = new Set<string>()
  for (const [key, quantity] of Object.entries(cart.quantities)) {
    if (!quantity || quantity <= 0) continue
    const { productId } = parseLineKey(key)
    const product = catalog.products.find((p) => p.id === productId)
    if (!product || product.step !== step || product.required) continue
    selected.add(productId)
  }
  return selected.size
}
