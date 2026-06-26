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
        'overflow-hidden transition-colors',
        // Expanded: tinted rounded panel. Collapsed: plain white with a
        // hairline below the section (separates it from the next step).
        open
          ? 'rounded-panel bg-panel'
          : 'border-b-[0.5px] border-border-step bg-bg',
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="block w-full px-5 py-4 text-left"
      >
        {header}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}
