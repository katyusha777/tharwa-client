import type { IStock } from '~/@types/assets'
import AssetsApi from '@api/AssetsApi'

export default abstract class AssetsAdapter {
  public static async stockSearch(symbol: string): Promise<IStock> {
    return AssetsApi.stockSearch(symbol)
  }
}
