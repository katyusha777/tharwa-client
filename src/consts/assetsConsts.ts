import type { IOption } from '~/@types'
import type { TAssetType, TCommodity } from '~/@types/assets'

export const commodities: Array<{ value: TCommodity, name: string }> = [
  { value: 'gold', name: 'Gold' },
  { value: 'silver', name: 'Silver' },
  { value: 'platinum', name: 'Platinum' },
  { value: 'copper', name: 'Copper' },
  { value: 'gasoline', name: 'Gasoline' },
  { value: 'brent', name: 'Crude Oil (Brent)' },
]

export const commodityUnits: Record<TCommodity, string> = {
  brent: 'usd/bbl',
  copper: 'usd/lbs',
  gasoline: 'usd/gal',
  platinum: 'usd/oz',
  silver: 'usd/oz',
  gold: 'usd/oz',
}

export const assetTypes: Array<IOption<TAssetType>> = [
  { name: 'Stock', value: 'stock' },
  { name: 'Commodity', value: 'commodity' },
  { name: 'Real Estate', value: 'real_estate' },
  { name: 'Crypto', value: 'crypto' },
]
