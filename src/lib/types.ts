/** The four builder steps (accordion sections), in display order. */
export type StepId = 'cameras' | 'plan' | 'sensors' | 'protection'

/** Review-panel category groupings (subheadings on the right). */
export type Category = 'cameras' | 'sensors' | 'accessories' | 'plan'

/** A selectable color/variant of a product. Each variant has its own quantity. */
export interface Variant {
  id: string
  label: string
  /** Placeholder swatch color (hex) until real swatch images are provided. */
  swatch: string
}

export interface Product {
  id: string
  /** Which review-panel category this product is summarized under. */
  category: Category
  /** Which accordion step this product is shown in. */
  step: StepId
  title: string
  description?: string
  learnMoreUrl?: string
  /** Placeholder image path/url. */
  image: string
  /** Discount badge text, e.g. "Save 22%". Omit for no badge. */
  badge?: string
  /** Struck-through compare-at price. Omit when there is no discount. */
  compareAt?: number
  /** Active price. 0 means FREE. */
  price: number
  /** Pricing unit suffix; 'mo' renders "/mo" (plan), 'each' renders nothing. */
  unit?: 'mo' | 'each'
  /** Color/variant options. Omit -> no selector (single stepper controls product). */
  variants?: Variant[]
  /** Marks required items (e.g. Sense Hub) — shown but not removable. */
  required?: boolean
  /**
   * Whether this product renders an add/stepper control on a card in the builder.
   * Sensors/accessory/plan in this view appear only in the review panel.
   */
  hasCardControl: boolean
}

/** A non-product summary row (e.g. shipping) shown in the review panel. */
export interface ExtraLine {
  id: string
  label: string
  price: number
  unit?: 'mo' | 'each'
  compareAt?: number
}

export interface Catalog {
  products: Product[]
  /** Extra review-only rows (shipping, etc.). */
  extras: ExtraLine[]
  /** Step metadata: title + icon key, in display order. */
  steps: { id: StepId; title: string; icon: string }[]
  /** Review-panel presentation config (financing pill, guarantee seal). */
  summary: {
    /** "as low as $X/mo" financing figure (hardcoded for now). */
    financingMonthly: number
    /** Guarantee seal image path (in /public). */
    sealImage: string
  }
}

/**
 * Cart line key: `productId` for variant-less products, or
 * `productId:variantId` so each variant is tracked independently.
 */
export type LineKey = string

/** Serializable cart state — the source of truth, persisted to localStorage. */
export interface CartState {
  /** Quantities keyed by LineKey. Absent or 0 = not selected. */
  quantities: Record<LineKey, number>
  /** UI-only: which variant is currently active per product. */
  activeVariant: Record<string, string>
  /** Which accordion step is currently open (null = all collapsed). */
  openStep: StepId | null
}

/** A derived, render-ready review-panel line. */
export interface ReviewLine {
  key: LineKey
  product: Product
  variant?: Variant
  quantity: number
  /** price * quantity (active). */
  lineTotal: number
  /** compareAt * quantity, falls back to lineTotal when no discount. */
  compareTotal: number
}

/** Derived price summary for the review panel footer. */
export interface Totals {
  /** One-time items subtotal at active price. */
  subtotal: number
  /** One-time items subtotal at compare-at price (pre-discount). */
  compareSubtotal: number
  /** compareSubtotal - subtotal. */
  savings: number
  /** Final one-time total (== subtotal here; kept separate for clarity/extension). */
  total: number
  /** Recurring plan cost per month, if a plan is selected. */
  monthly: number
}
