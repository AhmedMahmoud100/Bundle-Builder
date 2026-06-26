import type { Category, ReviewLine as ReviewLineData } from '../../../../lib/types'
import { ReviewLine } from './ReviewLine'

interface ReviewSectionProps {
  category: Category
  lines: ReviewLineData[]
}

const TITLES: Record<Category, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
}

/** A category group: subheading + its review lines. */
export function ReviewSection({ category, lines }: ReviewSectionProps) {
  return (
    <section>
      <h3 className="mb-1 text-xs font-normal uppercase tracking-wide text-text-mute2">
        {TITLES[category]}
      </h3>
      <div className="divide-y divide-border">
        {lines.map((line) => (
          <ReviewLine key={line.key} line={line} />
        ))}
      </div>
    </section>
  )
}
