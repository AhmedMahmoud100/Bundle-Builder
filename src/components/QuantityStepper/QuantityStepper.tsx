import { cn } from '../../lib/cn'

interface QuantityStepperProps {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  disabled?: boolean
  size?: 'sm' | 'md'
  /** Context drives the disabled look (different per design). */
  variant?: 'step' | 'review'
  'aria-label'?: string
}

/** Disabled-button styling per context. */
const DISABLED_STYLE: Record<NonNullable<QuantityStepperProps['variant']>, string> = {
  // Step: 2px border #E6EBF0, no background.
  step: 'disabled:border-2 disabled:border-border-disabled disabled:bg-transparent disabled:hover:bg-transparent',
  // Review: 1px border #CED6DE, #F1F1F2 fill.
  review:
    'disabled:border-border-panel disabled:bg-control-disabled disabled:hover:bg-control-disabled',
}

/**
 * +/- stepper with a value in the middle. The minus button is disabled at `min`.
 * Used on both product cards and review-panel lines; kept in sync via shared state.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  disabled,
  size = 'md',
  variant = 'step',
  'aria-label': ariaLabel,
}: QuantityStepperProps) {
  const atMin = value <= min
  const atMax = value >= max

  // Each button is its own square (no shared container background).
  const btn = cn(
    'flex items-center justify-center rounded border border-border bg-control text-text transition-colors',
    'hover:bg-surface-muted disabled:cursor-not-allowed disabled:text-text-faint',
    DISABLED_STYLE[variant],
    size === 'sm' ? 'h-5 w-5 text-sm' : 'h-8 w-8 text-lg',
  )

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={disabled || atMin}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={cn(
          'min-w-4 text-center font-semibold tabular-nums text-text',
          size === 'sm' ? 'text-sm' : 'text-base',
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={disabled || atMax}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
