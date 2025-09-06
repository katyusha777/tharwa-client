import type { TPortfolioAsset } from '@types'

export function formatCurrency(value: number | string, currency: string = 'USD') {
  const num = typeof value === 'string' ? Number.parseFloat(value) : value
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

export function formatCompactNumber(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toFixed(0)
}
export function calculateAssetValue(asset: TPortfolioAsset) {
  const price = Number.parseFloat(asset.asset.latest_value)
  return price * asset.units
}
