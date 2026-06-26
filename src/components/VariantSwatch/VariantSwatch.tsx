import { cn } from '../../lib/cn'

interface VariantSwatchProps {
  label: string
  /** Color hex used for the swatch dot (placeholder for real thumbnails). */
  swatch: string
  selected: boolean
  onSelect: () => void
}

/**
 * A single color chip: swatch dot + label. Selection styling is intentionally
 * light for now (per spec) — the behavior is what matters.
 */
export function VariantSwatch({
  label,
  swatch,
  selected,
  onSelect,
}: VariantSwatchProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-control border px-2 py-1 text-[0.625rem] font-medium transition-colors',
        selected
          ? 'border-primary text-text'
          : 'border-border text-text-muted hover:border-border-strong',
      )}
    >
      <span
        className="h-3.5 w-3.5 rounded-full border border-border"
        style={{ backgroundColor: swatch }}
      />
      {label}
    </button>
  )
}
