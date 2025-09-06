import type { IStock } from '~/@types/assets'
import Api from '@api/Api'

export default abstract class AssetsApi {
  public static stockSearch(symbol: string): Promise<IStock> {
    return Api.get<IStock>(`/assets/search/stock/${symbol}`)
  }
}
