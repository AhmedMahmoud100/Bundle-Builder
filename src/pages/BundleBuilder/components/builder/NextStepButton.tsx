import { Button } from '../../../../components/Button/Button'

interface NextStepButtonProps {
  /** Label of the step being advanced to, e.g. "Choose your sensors". */
  nextTitle: string
  onClick: () => void
}

/** "Next: …" button that advances the accordion to the following step. */
export function NextStepButton({ nextTitle, onClick }: NextStepButtonProps) {
  return (
    <div className="mt-4 flex justify-center">
      <Button variant="outline" size="md" onClick={onClick}>
        Next: {nextTitle}
      </Button>
    </div>
  )
}
