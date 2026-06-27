import type { ComponentType } from 'react'
import { CaretIcon } from '../../../../assets/icons/CaretIcon'
import { StepCamerasIcon } from '../../../../assets/icons/StepCamerasIcon'
import { StepPlanIcon } from '../../../../assets/icons/StepPlanIcon'
import { StepSensorsIcon } from '../../../../assets/icons/StepSensorsIcon'
import { StepProtectionIcon } from '../../../../assets/icons/StepProtectionIcon'
import { cn } from '../../../../lib/cn'

/** Maps a step's catalog `icon` key to its dedicated icon component. */
const STEP_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  camera: StepCamerasIcon,
  plan: StepPlanIcon,
  sensor: StepSensorsIcon,
  shield: StepProtectionIcon,
}

interface StepHeaderProps {
  index: number
  total: number
  title: string
  icon: string
  open: boolean
  selectedCount: number
}

/**
 * Accordion step header: "STEP X OF N" eyebrow, step icon + title, and a
 * right-side state indicator — open shows "N selected" + up-chevron,
 * collapsed shows a down-chevron.
 */
export function StepHeader({
  index,
  total,
  title,
  icon,
  open,
  selectedCount,
}: StepHeaderProps) {
  const StepIcon = STEP_ICONS[icon]
  return (
    <span className="flex w-full flex-col">
      {/* Eyebrow */}
      <span
        className={cn(
          'font-semibold uppercase tracking-wide text-text-faint',
          open ? 'text-[0.75rem]' : 'text-[0.625rem]',
        )}
      >
        Step {index} of {total}
      </span>

      {/* Divider under the eyebrow — breaks out of the header's px-5 padding */}
      <span className="mt-1.5 mb-3 -mx-3 block border-t-[0.5px] border-border-step sm:-mx-5" />

      {/* Title row: icon + title (left), selected + caret (right) */}
      <span className="flex w-full items-center gap-3">
        {StepIcon && <StepIcon className="h-6 w-6 shrink-0 text-text-slate" />}
        <span className="text-[1.375rem] font-semibold text-text">{title}</span>
        <span className="ml-auto flex items-center gap-2 text-sm font-semibold text-primary">
          {open && selectedCount > 0 && <span>{selectedCount} selected</span>}
          <CaretIcon open={open} />
        </span>
      </span>
    </span>
  )
}
