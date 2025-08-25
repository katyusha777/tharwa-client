import type { IBooleanResponse } from '@types'
import type { IAssetFormDTO, IPortfolioAsset } from '~/@types/portfolio'
import Api from '@api/Api'

export default abstract class PortfolioAssetApi {
  public static getAsset(id: string): Promise<IPortfolioAsset> {
    return Api.get<IPortfolioAsset>(`/portfolio/asset/${id}`)
  }

  public static createAsset(data: IAssetFormDTO): Promise<IBooleanResponse> {
    return Api.post<IBooleanResponse>('/portfolio/asset', data)
  }

  public static updateAsset(id: string, amount: number): Promise<IBooleanResponse> {
    return Api.put<IBooleanResponse>(`/portfolio/asset/${id}`, { amount })
  }

  public static deleteAsset(id: string): Promise<IBooleanResponse> {
    return Api.delete<IBooleanResponse>(`/portfolio/asset/${id}`)
  }
}
