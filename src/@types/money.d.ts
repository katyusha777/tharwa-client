export type TCurrency = 'USD' | 'EUR' | 'QAR'

export interface TMonetaryValue {
  currency: TCurrency
  value: number
}
