import { useSystemBuilder } from '../../../../hooks/useSystemBuilder'
import { groupByCategory } from '../../../../lib/selectors'
import { ReviewSection } from './ReviewSection'
import { SummaryFooter } from './SummaryFooter'

/**
 * "Your security system" — the live review panel. Reflects the configured
 * system: items grouped by category, each with its own stepper, plus the
 * totals/checkout footer.
 */
export function ReviewPanel() {
  const { reviewLines } = useSystemBuilder()
  const groups = groupByCategory(reviewLines)

  return (
    <aside className="rounded-panel bg-panel p-5">
      <p className="mb-3 text-xs font-normal uppercase leading-none tracking-[0.1333em] text-text-faint">
        Review
      </p>
      <h2 className="text-[1.375rem] font-extrabold text-text">
        Your security system
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        {groups.length > 0 ? (
          groups.map((g) => (
            <ReviewSection
              key={g.category}
              category={g.category}
              lines={g.lines}
            />
          ))
        ) : (
          <p className="py-4 text-center text-sm text-text-muted">
            No items selected yet. Build your system on the left.
          </p>
        )}
      </div>

      <div className="mt-4">
        <SummaryFooter />
      </div>
    </aside>
  )
}
