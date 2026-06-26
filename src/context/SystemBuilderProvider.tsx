import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartState, StepId } from '../lib/types'
import { catalog, seedCart } from '../data/seed'
import { lineKey } from '../lib/keys'
import { computeTotals } from '../lib/pricing'
import {
  deriveReviewLines,
  selectedCount as selectStepCount,
} from '../lib/selectors'
import { readStorage, writeStorage } from '../hooks/useLocalStorage'
import { SystemBuilderContext } from './systemBuilderContext'
import type { SystemBuilderApi } from './systemBuilderContext'

const STORAGE_KEY = 'wyze-bundle-builder/v2'

/** Hydrate from localStorage if a saved system exists, else use the seed. */
function initialCart(): CartState {
  const saved = readStorage<CartState>(STORAGE_KEY)
  if (saved && saved.quantities) {
    return {
      quantities: saved.quantities,
      activeVariant: saved.activeVariant ?? {},
      openStep: saved.openStep ?? 'cameras',
    }
  }
  return seedCart
}

const STEP_ORDER: StepId[] = ['cameras', 'plan', 'sensors', 'protection']

/** Default active variant for a product = its first variant (if any). */
function defaultVariant(productId: string): string | undefined {
  return catalog.products.find((p) => p.id === productId)?.variants?.[0]?.id
}

export function SystemBuilderProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(initialCart)
  const [justSaved, setJustSaved] = useState(false)
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeVariantOf = useCallback(
    (productId: string) => cart.activeVariant[productId] ?? defaultVariant(productId),
    [cart.activeVariant],
  )

  const getQuantity = useCallback(
    (productId: string, variantId?: string) =>
      cart.quantities[lineKey(productId, variantId)] ?? 0,
    [cart.quantities],
  )

  const setQuantity = useCallback(
    (productId: string, variantId: string | undefined, qty: number) => {
      const key = lineKey(productId, variantId)
      const next = Math.max(0, qty)
      setCart((prev) => {
        const quantities = { ...prev.quantities }
        if (next === 0) delete quantities[key]
        else quantities[key] = next
        return { ...prev, quantities }
      })
    },
    [],
  )

  const increment = useCallback(
    (productId: string, variantId?: string) => {
      setQuantity(productId, variantId, getQuantity(productId, variantId) + 1)
    },
    [getQuantity, setQuantity],
  )

  const decrement = useCallback(
    (productId: string, variantId?: string) => {
      setQuantity(productId, variantId, getQuantity(productId, variantId) - 1)
    },
    [getQuantity, setQuantity],
  )

  const setActiveVariant = useCallback((productId: string, variantId: string) => {
    setCart((prev) => ({
      ...prev,
      activeVariant: { ...prev.activeVariant, [productId]: variantId },
    }))
  }, [])

  const toggleStep = useCallback((step: StepId) => {
    setCart((prev) => ({
      ...prev,
      openStep: prev.openStep === step ? null : step,
    }))
  }, [])

  const goToNextStep = useCallback(() => {
    setCart((prev) => {
      const idx = prev.openStep ? STEP_ORDER.indexOf(prev.openStep) : -1
      const next = STEP_ORDER[Math.min(idx + 1, STEP_ORDER.length - 1)]
      return { ...prev, openStep: next }
    })
  }, [])

  const selectedCount = useCallback(
    (step: StepId) => selectStepCount(catalog, cart, step),
    [cart],
  )

  const reviewLines = useMemo(() => deriveReviewLines(catalog, cart), [cart])
  const totals = useMemo(() => computeTotals(reviewLines), [reviewLines])

  const saveForLater = useCallback(() => {
    writeStorage(STORAGE_KEY, cart)
    setJustSaved(true)
    if (savedTimer.current) clearTimeout(savedTimer.current)
    savedTimer.current = setTimeout(() => setJustSaved(false), 2500)
  }, [cart])

  const value = useMemo<SystemBuilderApi>(
    () => ({
      catalog,
      getQuantity,
      setQuantity,
      increment,
      decrement,
      activeVariantOf,
      setActiveVariant,
      openStep: cart.openStep,
      toggleStep,
      goToNextStep,
      selectedCount,
      reviewLines,
      extras: catalog.extras,
      totals,
      saveForLater,
      justSaved,
    }),
    [
      getQuantity,
      setQuantity,
      increment,
      decrement,
      activeVariantOf,
      setActiveVariant,
      cart.openStep,
      toggleStep,
      goToNextStep,
      selectedCount,
      reviewLines,
      totals,
      saveForLater,
      justSaved,
    ],
  )

  return (
    <SystemBuilderContext.Provider value={value}>
      {children}
    </SystemBuilderContext.Provider>
  )
}
