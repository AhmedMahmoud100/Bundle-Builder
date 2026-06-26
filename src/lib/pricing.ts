import type { ReviewLine, Totals } from './types'

/** Round to 2 decimals, avoiding binary float drift (e.g. 0.1+0.2). */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

/** Format a number as USD currency, e.g. 27.98 -> "$27.98". */
export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`
}

/**
 * Compute the review-panel totals from the derived review lines.
 * One-time items (unit !== 'mo') feed subtotal/savings/total.
 * Plan items (unit === 'mo') are summed separately into `monthly`.
 */
export function computeTotals(lines: ReviewLine[]): Totals {
  let subtotal = 0
  let compareSubtotal = 0
  let monthly = 0

  for (const line of lines) {
    if (line.product.unit === 'mo') {
      monthly += line.lineTotal
      continue
    }
    subtotal += line.lineTotal
    compareSubtotal += line.compareTotal
  }

  subtotal = round2(subtotal)
  compareSubtotal = round2(compareSubtotal)
  monthly = round2(monthly)

  return {
    subtotal,
    compareSubtotal,
    savings: round2(compareSubtotal - subtotal),
    total: subtotal,
    monthly,
  }
}
