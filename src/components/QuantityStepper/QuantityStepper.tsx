import { cn } from '../../lib/cn'

interface QuantityStepperProps {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  disabled?: boolean
  size?: 'sm' | 'md'
  'aria-label'?: string
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
  'aria-label': ariaLabel,
}: QuantityStepperProps) {
  const atMin = value <= min
  const atMax = value >= max

  const btn = cn(
    'flex items-center justify-center rounded-md text-text transition-colors',
    'hover:bg-surface-muted disabled:cursor-not-allowed disabled:text-text-faint disabled:hover:bg-transparent',
    size === 'sm' ? 'h-6 w-6 text-base' : 'h-8 w-8 text-lg',
  )

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-control border border-border bg-bg',
        size === 'sm' ? 'px-1 py-0.5' : 'px-1.5 py-1',
        disabled && 'opacity-50',
      )}
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
          'min-w-5 text-center font-semibold tabular-nums text-text',
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
