import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
}

/** Discount pill, e.g. "Save 22%" — indigo background, white text. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill bg-primary px-2.5 py-1 text-xs font-bold text-primary-fg',
        className,
      )}
    >
      {children}
    </span>
  )
}
