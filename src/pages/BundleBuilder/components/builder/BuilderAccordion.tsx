import { AccordionItem } from '../../../../components/Accordion/Accordion'
import type { IconName } from '../../../../components/Icon/Icon'
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
    <div className="flex flex-col gap-3">
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
                icon={step.icon as IconName}
                open={open}
                selectedCount={selectedCount(step.id)}
              />
            }
          >
            {cards.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cards.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="rounded-control bg-surface-muted px-4 py-6 text-center text-sm text-text-muted">
                Your selections for this step are shown in “Your security
                system” on the right.
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
