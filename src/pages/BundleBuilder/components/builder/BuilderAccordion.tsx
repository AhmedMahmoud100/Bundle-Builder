import { AccordionItem } from '../../../../components/Accordion/Accordion'
import { useSystemBuilder } from '../../../../hooks/useSystemBuilder'
import type { Product, StepId } from '../../../../lib/types'
import { NextStepButton } from './NextStepButton'
import { ProductCard } from './ProductCard'
import { StepHeader } from './StepHeader'

/** Products shown in the builder for a step (those with a card control). */
function cardsForStep(products: Product[], step: StepId): Product[] {
  return products.filter((p) => p.step === step && p.hasCardControl)
}

export function BuilderAccordion() {
  const {
    catalog,
    openStep,
    toggleStep,
    goToNextStep,
    selectedCount,
  } = useSystemBuilder()

  const steps = catalog.steps
  const total = steps.length

  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, i) => {
        const open = openStep === step.id
        const cards = cardsForStep(catalog.products, step.id)
        const nextStep = steps[i + 1]

        return (
          <AccordionItem
            key={step.id}
            open={open}
            onToggle={() => toggleStep(step.id)}
            header={
              <StepHeader
                index={i + 1}
                total={total}
                title={step.title}
                icon={step.icon}
                open={open}
                selectedCount={selectedCount(step.id)}
              />
            }
          >
            {cards.length > 0 ? (
              // ≤lg: vertical cards wrap (auto-fill ~150px columns).
              // ≥lg: switch to the 2-column horizontal-card layout.
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] items-stretch gap-3 lg:grid-cols-2">
                {cards.map((p, idx) => {
                  // ≥lg only: a trailing odd card spans both columns, centered.
                  const isLoneLast =
                    idx === cards.length - 1 && cards.length % 2 === 1
                  return (
                    <div
                      key={p.id}
                      className={
                        isLoneLast
                          ? 'lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.375rem)]'
                          : undefined
                      }
                    >
                      <ProductCard product={p} />
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="rounded-control bg-surface-muted px-4 py-6 text-center text-sm text-text-muted">
                There is no available data currently.
              </p>
            )}

            {nextStep && (
              <NextStepButton
                nextTitle={nextStep.title}
                onClick={goToNextStep}
              />
            )}
          </AccordionItem>
        )
      })}
    </div>
  )
}
