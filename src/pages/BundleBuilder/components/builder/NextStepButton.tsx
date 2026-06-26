import type { MouseEvent } from 'react'
import { Button } from '../../../../components/Button/Button'

interface NextStepButtonProps {
  /** Label of the step being advanced to, e.g. "Choose your sensors". */
  nextTitle: string
  onClick: () => void
}

/** "Next: …" button that advances the accordion to the following step. */
export function NextStepButton({ nextTitle, onClick }: NextStepButtonProps) {
  // Stop the click bubbling to the accordion header toggle, then advance.
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <div className="mt-4 flex justify-center">
      <Button variant="outline" size="md" onClick={handleClick}>
        Next: {nextTitle}
      </Button>
    </div>
  )
}
