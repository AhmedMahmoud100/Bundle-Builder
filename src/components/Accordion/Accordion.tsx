import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface AccordionItemProps {
  open: boolean
  onToggle: () => void
  /** Clickable header content (left side: icon + titles; right: state indicator). */
  header: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Generic controlled collapsible. The parent owns the open state so only one
 * item is open at a time (single-open accordion). Header is fully custom.
 */
export function AccordionItem({
  open,
  onToggle,
  header,
  children,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-panel border border-border transition-colors',
        // Expanded step takes the tinted panel background; collapsed stays white.
        open ? 'bg-panel' : 'bg-bg',
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        {header}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}
