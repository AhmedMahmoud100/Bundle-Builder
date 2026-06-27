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
          ? 'rounded-none bg-panel sm:rounded-panel'
          : 'border-b-[0.5px] border-border-step bg-bg',
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="block w-full px-3 py-4 text-left sm:px-5"
      >
        {header}
      </button>
      {/*
        Animated collapse via the grid-rows 0fr→1fr trick: the row track
        animates between 0 and content height while the inner wrapper clips
        overflow. Content stays mounted so the height can transition.
      */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-5 sm:px-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
