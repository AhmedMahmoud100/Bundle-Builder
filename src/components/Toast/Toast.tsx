import { CheckIcon } from '../../assets/icons/CheckIcon'
import { cn } from '../../lib/cn'

interface ToastProps {
  /** Whether the toast is visible. */
  show: boolean
  message: string
}

/**
 * A small success toast pinned to the bottom-center of the viewport.
 * Fades/slides in when `show` is true and out when false (parent controls
 * the timing). Stays mounted so the exit transition can play.
 */
export function Toast({ show, message }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed right-6 top-6 z-50 flex justify-end transition-all duration-300',
        show ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
      )}
    >
      <div className="flex items-center gap-2 rounded-control bg-success px-4 py-3 text-sm font-semibold text-primary-fg shadow-lg">
        <CheckIcon className="h-4 w-4" />
        {message}
      </div>
    </div>
  )
}
