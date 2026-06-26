import { createContext } from 'react'
import type {
  Catalog,
  ExtraLine,
  ReviewLine,
  StepId,
  Totals,
} from '../lib/types'

/** Everything the UI needs — all logic lives behind this context. */
export interface SystemBuilderApi {
  catalog: Catalog

  // --- quantity (card stepper binds to the active variant) ---
  getQuantity: (productId: string, variantId?: string) => number
  setQuantity: (productId: string, variantId: string | undefined, qty: number) => void
  increment: (productId: string, variantId?: string) => void
  decrement: (productId: string, variantId?: string) => void

  // --- variants ---
  activeVariantOf: (productId: string) => string | undefined
  setActiveVariant: (productId: string, variantId: string) => void

  // --- accordion ---
  openStep: StepId | null
  /** Toggle a step open; clicking the open step collapses it (null). */
  toggleStep: (step: StepId) => void
  goToNextStep: () => void
  selectedCount: (step: StepId) => number

  // --- derived review data ---
  reviewLines: ReviewLine[]
  extras: ExtraLine[]
  totals: Totals

  // --- persistence ---
  saveForLater: () => void
  /** True briefly after a successful save (for confirmation UI). */
  justSaved: boolean
}

export const SystemBuilderContext = createContext<SystemBuilderApi | null>(null)
