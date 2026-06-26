import { Icon } from '../../../../components/Icon/Icon'

/**
 * Friendly empty state for the review panel — shown when no items are selected.
 * Centered icon badge + heading + helper line.
 */
export function EmptyReview() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon name="shield" className="h-7 w-7" filled />
      </span>
      <p className="text-base font-bold text-text">Your system is empty</p>
      <p className="mt-1 max-w-[15rem] text-sm font-medium text-text-muted">
        Start building on the left and your selections will appear here.
      </p>
    </div>
  )
}
