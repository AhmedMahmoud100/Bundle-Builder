import type { Catalog, CartState } from '../lib/types'
import catalogJson from './catalog.json'

/** The catalog, typed. JSON is the data-driven source of truth. */
export const catalog = catalogJson as Catalog

/**
 * Initial cart: a fully empty system — nothing selected. The shopper builds
 * from scratch. Camera variants default to their first (White) chip.
 */
export const seedCart: CartState = {
  quantities: {},
  activeVariant: {
    'cam-v4': 'white',
    'cam-pan-v3': 'white',
    'cam-floodlight-v2': 'white',
    'battery-cam-pro': 'white',
  },
  openStep: 'cameras',
}
