import { cn } from '../../lib/cn'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
}

/**
 * Renders the product image, or a neutral placeholder box when no asset is set
 * yet (swap real images into the catalog later — no markup change needed).
 */
export function ProductImage({ src, alt, className }: ProductImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('object-contain', className)}
        loading="lazy"
      />
    )
  }
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md bg-surface-muted text-text-faint',
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <svg viewBox="0 0 24 24" className="h-1/3 w-1/3" fill="currentColor">
        <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 11 4-4 3 3 3-3 4 4V7H5v9Z" />
      </svg>
    </div>
  )
}
