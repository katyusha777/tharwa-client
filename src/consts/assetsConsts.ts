import type { IOption } from '~/@types'
import type { TAssetType } from '~/@types/assets'

export const commodities = [
  { value: 'XAU', name: 'Gold' },
  { value: 'XAG', name: 'Silver' },
  { value: 'XPT', name: 'Platinum' },
  { value: 'XPD', name: 'Palladium' },
  { value: 'CL', name: 'Crude Oil (WTI)' },
  { value: 'BRN', name: 'Crude Oil (Brent)' },
  { value: 'NG', name: 'Natural Gas' },
  { value: 'XCU', name: 'Copper' },
  { value: 'XAL', name: 'Aluminum' },
]

export const assetTypes: Array<IOption<TAssetType>> = [
  { name: 'Stock', value: 'stock' },
  { name: 'Commodity', value: 'commodity' },
  { name: 'Real Estate', value: 'real_estate' },
  { name: 'Crypto', value: 'crypto' },
]
