import type { TSentimentScore } from '~/@types/portfolio'

export type TAssetType = 'stock' | 'real_estate' | 'commodity' | 'crypto'
export type TCommodity = 'gold' | 'silver' | 'platinum' | 'copper' | 'gasoline' | 'brent'
export type TCurrency = 'USD' | 'EUR' | 'QAR'

export interface IRealEstate {
  id: string
  address: string
  value: number
  currency: TCurrency
}

export interface IStock {
  id: string
  symbol: string
  name: string
  is_shariah_compliant: boolean
  currency: TCurrency
  latest_value: number
  sentiment_analysis: string
  sentiment_score: TSentimentScore
  exchange: IExchange
}

export interface IExchange {
  name: string
  acronym: string
  mic: string
  country: string | null
  country_code: string
  city: string
  website: string
  operating_mic: string
  oprt_sgmt: string
  legal_entity_name: string
  market_category_code: string
  exchange_status: string
  id: string
}

export interface ICrypto {
  id: string
  symbol: string
  name: string
  currency: 'USD'
  latest_value: number
  sentiment_analysis: string
  sentiment_score: TSentimentScore
}

export interface ICommodity {
  id: string
  symbol: string
  name: string
  sentiment_analysis: string
  sentiment_score: TSentimentScore

  latest_value: number
  currency: TCurrency
}

export type TAssetFormDTO = {
  id?: string
  asset_type: TAssetType
} & (
    {
      asset_type: 'real_estate'
      address: string
      currency: TCurrency
      value: number
    } | {
      asset_type: 'crypto'
      symbol: string
      units: number
    } | {
      asset_type: 'stock'
      symbol: string
      units: number
    } | {
      asset_type: 'commodity'
      symbol: string
      units: number
    }
    )
