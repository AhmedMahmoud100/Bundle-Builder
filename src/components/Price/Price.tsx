import { cn } from '../../lib/cn'
import { formatPrice } from '../../lib/pricing'

/** Pricing color context — card and review use different palettes. */
type PriceContext = 'card' | 'review' | 'plain'

interface PriceProps {
  /** Active price. 0 renders as "FREE". */
  price: number
  /** Optional struck-through compare-at price. */
  compareAt?: number
  /** Suffix e.g. "/mo" for plans. */
  unit?: 'mo' | 'each'
  /** Visual scale. */
  size?: 'sm' | 'md' | 'lg'
  /** Stack compare-at above active price (review lines) vs inline (cards). */
  layout?: 'inline' | 'stacked'
  /** Which color set to use for active/compare prices. */
  context?: PriceContext
  className?: string
}

// Active and compare share the same size per scale:
//   sm (review) = 14px, md (card) = 16px, lg = 20px.
const ACTIVE_SIZE = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }
const COMPARE_SIZE = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
// When there's no discount, the lone active price is bumped one step up.
const ACTIVE_SIZE_SOLO = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' }

/** active + compare text color per context (general tokens, reused). */
const COLORS: Record<PriceContext, { active: string; compare: string }> = {
  card: { active: 'text-text-soft', compare: 'text-sale' },
  review: { active: 'text-primary', compare: 'text-text-slate' },
  plain: { active: 'text-text', compare: 'text-text-faint' },
}

export function Price({
  price,
  compareAt,
  unit,
  size = 'md',
  layout = 'inline',
  context = 'plain',
  className,
}: PriceProps) {
  const suffix = unit === 'mo' ? '/mo' : ''
  const showCompare = compareAt != null && compareAt > price
  const isFree = price === 0
  const colors = COLORS[context]

  const compareEl = showCompare && (
    <span
      className={cn(
        'font-normal line-through',
        colors.compare,
        COMPARE_SIZE[size],
      )}
    >
      {formatPrice(compareAt)}
      {suffix}
    </span>
  )

  const activeSize = showCompare ? ACTIVE_SIZE[size] : ACTIVE_SIZE_SOLO[size]
  const activeEl = (
    <span
      className={cn(
        'font-normal',
        isFree ? 'text-primary' : colors.active,
        activeSize,
      )}
    >
      {isFree ? 'FREE' : `${formatPrice(price)}${suffix}`}
    </span>
  )

  return (
    <span
      className={cn(
        layout === 'stacked'
          ? 'flex flex-col items-end leading-tight'
          : 'inline-flex items-baseline gap-1.5',
        className,
      )}
    >
      {layout === 'stacked' ? (
        <>
          {compareEl}
          {activeEl}
        </>
      ) : (
        <>
          {activeEl}
          {compareEl}
        </>
      )}
    </span>
  )
}
