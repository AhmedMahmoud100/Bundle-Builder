import { Toast } from '../../components/Toast/Toast'
import { useSystemBuilder } from '../../hooks/useSystemBuilder'
import { BuilderAccordion } from './components/builder/BuilderAccordion'
import { ReviewPanel } from './components/review/ReviewPanel'

/**
 * The single page: a two-column experience.
 *  - Left: the builder (4-step accordion).
 *  - Right: the live "Your security system" review panel.
 *
 * Responsive: columns sit side by side on large screens; on smaller viewports
 * they stack into a single column (review panel drops below the builder).
 */
export function BundleBuilderPage() {
  const { justSaved } = useSystemBuilder()

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold text-text lg:hidden">
          Let's get started!
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <main>
          <BuilderAccordion />
        </main>
        <div className="lg:sticky lg:top-6">
          <ReviewPanel />
        </div>
      </div>

      <Toast show={justSaved} message="Your system has been saved" />
    </div>
  )
}
