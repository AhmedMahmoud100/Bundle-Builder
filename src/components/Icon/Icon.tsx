/**
 * Tiny inline icon set (no external dependency). Each icon inherits
 * `currentColor` so callers control color via text-* utilities.
 */
export type IconName =
  | 'camera'
  | 'plan'
  | 'sensor'
  | 'shield'
  | 'chevron-down'
  | 'chevron-up'
  | 'truck'
  | 'check'

const PATHS: Record<IconName, React.ReactNode> = {
  camera: (
    <>
      <path d="M2 7a2 2 0 0 1 2-2h2l1.2-1.6A2 2 0 0 1 8.8 3h6.4a2 2 0 0 1 1.6.8L18 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  plan: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 4v16" />
    </>
  ),
  sensor: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M6 6a9 9 0 0 0 0 12M18 6a9 9 0 0 1 0 12" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />,
  'chevron-down': <path d="M5 8.5l7 7 7-7" />,
  'chevron-up': <path d="M5 15.5l7-7 7 7" />,
  truck: (
    <>
      <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" />
      <circle cx="6" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
}

interface IconProps {
  name: IconName
  className?: string
  /** Fill solid icons (shield) vs stroked. Defaults to stroke. */
  filled?: boolean
}

export function Icon({ name, className, filled }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
