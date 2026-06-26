import { cn } from '../../lib/cn'

interface CaretIconProps {
  /** When true the caret rotates 180° (points up). */
  open?: boolean
  className?: string
}

/**
 * Filled triangle caret. Points down by default and rotates 180° when `open`.
 * Inherits color via `currentColor` — set it through a parent `text-*` utility.
 */
export function CaretIcon({ open, className }: CaretIconProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(
        'shrink-0 transition-transform duration-200',
        open && 'rotate-180',
        className,
      )}
    >
      <path
        d="M6.40682 9.43039C6.20741 9.70956 5.7925 9.70956 5.59309 9.43038L1.56472 3.79062C1.32834 3.45968 1.5649 3 1.97159 3L10.0284 3C10.4351 3 10.6716 3.45969 10.4353 3.79062L6.40682 9.43039Z"
        fill="currentColor"
      />
    </svg>
  )
}
