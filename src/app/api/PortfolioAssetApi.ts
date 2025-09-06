import type { IBooleanResponse } from '@types'
import type { TPortfolioAsset } from '~/@types'
import type { TAssetFormDTO } from '~/@types/assets'
import Api from '@api/Api'

export default abstract class PortfolioAssetApi {
  public static getAsset(id: string): Promise<TPortfolioAsset> {
    return Api.get<TPortfolioAsset>(`/portfolio/asset/${id}`)
  }

  public static createAsset(data: TAssetFormDTO): Promise<IBooleanResponse> {
    return Api.post<IBooleanResponse>('/portfolio/asset', data)
  }

  public static updateAsset(id: string, data: TAssetFormDTO): Promise<IBooleanResponse> {
    return Api.put<IBooleanResponse>(`/portfolio/asset/${id}`, data)
  }

  public static deleteAsset(id: string): Promise<IBooleanResponse> {
    return Api.delete<IBooleanResponse>(`/portfolio/asset/${id}`)
  }
}
