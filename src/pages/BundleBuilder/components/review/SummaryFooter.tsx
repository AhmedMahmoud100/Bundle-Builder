import { Button } from '../../../../components/Button/Button'
import { Icon } from '../../../../components/Icon/Icon'
import { Price } from '../../../../components/Price/Price'
import { useSystemBuilder } from '../../../../hooks/useSystemBuilder'
import { formatPrice } from '../../../../lib/pricing'

/**
 * Review-panel footer: shipping row, then a row pairing the guarantee seal with
 * the financing pill + total, followed by the savings callout, Checkout button,
 * and "Save my system for later".
 */
export function SummaryFooter() {
  const { catalog, extras, totals, saveForLater } = useSystemBuilder()
  const { financingMonthly, sealImage } = catalog.summary

  return (
    <div className="flex flex-col gap-4">
      {/* Shipping & extra rows */}
      <div className="divide-y divide-border border-t border-border">
        {extras.map((extra) => (
          <div key={extra.id} className="flex items-center gap-3 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-bg text-primary">
              <Icon name="truck" className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-semibold text-text">
              {extra.label}
            </span>
            <Price
              price={extra.price}
              compareAt={extra.compareAt}
              unit={extra.unit}
              size="sm"
              layout="stacked"
              context="review"
            />
          </div>
        ))}
      </div>

      {/* Seal + financing/total */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <img
          src={sealImage}
          alt="100% Wyze satisfaction guarantee"
          className="h-24 w-24 shrink-0 object-contain"
        />
        <div className="flex flex-col items-end gap-1.5">
          <span className="rounded-control bg-primary px-3 py-1 text-xs font-semibold text-primary-fg">
            as low as {formatPrice(financingMonthly)}/mo
          </span>
          <div className="flex items-baseline gap-2">
            {totals.savings > 0 && (
              <span className="text-base font-medium text-text-slate line-through">
                {formatPrice(totals.compareSubtotal)}
              </span>
            )}
            <span className="text-3xl font-extrabold text-primary">
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Savings callout */}
      {totals.savings > 0 && (
        <p className="text-center text-sm font-semibold text-success">
          Congrats! You're saving {formatPrice(totals.savings)} on your security
          bundle!
        </p>
      )}

      <Button fullWidth size="lg">
        Checkout
      </Button>

      <button
        type="button"
        onClick={saveForLater}
        className="text-center text-sm font-normal text-text-faint underline underline-offset-2"
      >
        Save my system for later
      </button>
    </div>
  )
}
