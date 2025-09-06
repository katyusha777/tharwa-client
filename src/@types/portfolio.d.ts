import type { ICommodity, ICrypto, IRealEstate, IStock, TAssetType } from '~/@types/assets'
import type { TMonetaryValue } from '~/@types/money'

export type TSentimentScore = -1 | 0 | 1

export interface AssetInsight {
  id: string
  name: string
  symbol: string
  insight: string
}

export interface IPortfolioAnalysis {
  overall_analysis: string
  portfolio_recommendations: string[]
  compliance_summary: string
  asset_insights: AssetInsight[]
  watchlist: string[]
}

export interface ZoyaComplianceData {
  isCompliant: boolean
  symbol: string
  name: string
  exchange: string
  status: string
}

export type TPortfolioAsset = {
  id: string
  value: TMonetaryValue
  type: TAssetType
  asset_id: string
  units: number
} & (
    { type: 'real_estate', asset: IRealEstate } |
    { type: 'stock', asset: IStock } |
    { type: 'crypto', asset: ICrypto } |
    { type: 'commodity', asset: ICommodity }
    )

export interface IPortfolio {
  id: string
  user_id: string
  name: string
  total: TMonetaryValue
  grouped_totals: Record<TAssetType, TMonetaryValue>
  analysis: IPortfolioAnalysis
  assets: Array<TPortfolioAsset>
}
