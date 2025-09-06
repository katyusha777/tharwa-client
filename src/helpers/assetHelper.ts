import type { TAssetType } from '~/@types/assets'

export function assetTypeTitle(type: TAssetType): string {
  if (type === 'stock')
    return 'Stock'
  if (type === 'commodity')
    return 'Commodity'
  if (type === 'crypto')
    return 'Crypto'
  if (type === 'real_estate')
    return 'Real Estate'
}
