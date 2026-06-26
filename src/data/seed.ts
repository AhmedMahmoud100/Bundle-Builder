import type { Catalog, CartState } from '../lib/types'
import { lineKey } from '../lib/keys'
import catalogJson from './catalog.json'

/** The catalog, typed. JSON is the data-driven source of truth. */
export const catalog = catalogJson as Catalog

/**
 * Initial cart so the app loads matching the design's review panel:
 * Cam v4 ×1, Cam Pan v3 ×2, Motion Sensor ×2, Sense Hub ×1 (free, required),
 * MicroSD ×2, Cam Unlimited plan, plus the always-present Fast Shipping row.
 * Cameras seed against their default (White) variant.
 */
export const seedCart: CartState = {
  quantities: {
    [lineKey('cam-v4', 'white')]: 1,
    [lineKey('cam-pan-v3', 'white')]: 2,
    [lineKey('sense-motion-sensor')]: 2,
    [lineKey('sense-hub')]: 1,
    [lineKey('microsd-256')]: 2,
    [lineKey('cam-unlimited')]: 1,
  },
  activeVariant: {
    'cam-v4': 'white',
    'cam-pan-v3': 'white',
    'battery-cam-pro': 'white',
  },
  openStep: 'cameras',
}
