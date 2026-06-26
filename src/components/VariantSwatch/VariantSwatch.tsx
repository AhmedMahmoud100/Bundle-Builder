import { cn } from '../../lib/cn'

interface VariantSwatchProps {
  label: string
  /** 22×22 swatch thumbnail image (preferred). */
  thumb?: string
  /** Fallback color dot when no thumb image is set. */
  swatch?: string
  selected: boolean
  /** This variant has a quantity > 0 (shows the "in cart" green highlight). */
  inCart?: boolean
  onSelect: () => void
}

/**
 * A single color chip: 25×25 swatch thumbnail (or color dot) + label.
 * A variant with quantity > 0 gets a green "in cart" border + faint teal fill,
 * independent of which chip is currently selected.
 */
export function VariantSwatch({
  label,
  thumb,
  swatch,
  selected,
  inCart,
  onSelect,
}: VariantSwatchProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-0 rounded-control border px-2 py-0.5 text-[0.625rem] font-medium text-text-strong transition-colors',
        inCart
          ? 'border-[0.5px] border-instock bg-instock-bg'
          : selected
            ? 'border-primary'
            : 'border-border hover:border-border-strong',
      )}
    >
      {thumb ? (
        <img
          src={thumb}
          alt=""
          className="h-[22px] w-[22px] shrink-0 object-contain"
        />
      ) : (
        <span
          className="h-3.5 w-3.5 rounded-full border border-border"
          style={{ backgroundColor: swatch }}
        />
      )}
      {label}
    </button>
  )
}
