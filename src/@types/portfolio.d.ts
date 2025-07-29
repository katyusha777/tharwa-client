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

export interface IAsset {
  id: string
  symbol: string
  name: string
  asset_type: string // e.g., 'stock', 'crypto', etc.
  exchange: string | null
  is_shariah_compliant: boolean
  zoya_compliance_data: ZoyaComplianceData
  created_at: string // e.g., '2025-07-14 22:53:47.813'
  updated_at: string | null
  currency: string
  latest_value: string // possibly parse to number downstream
  exchange_country: string
  sentiment_analysis: string
  sentiment_score: TSentimentScore
  last_sentiment_update: string // ISO format
  last_shariah_check: string // ISO format
}

export interface IPortfolioAsset {
  id: string
  portfolio_id: string
  asset_id: string
  units: number
  asset: IAsset
}

export interface IPortfolioTotals {
  USD?: number
  QAR?: number
}

export interface IPortfolio {
  id: string
  user_id: string
  name: string
  analysis: IPortfolioAnalysis
  assets: Array<IPortfolioAsset>
  totals: IPortfolioTotals
}
