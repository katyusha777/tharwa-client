import type { TAssetFormDTO } from '~/@types/assets'
import type { TPortfolioAsset } from '~/@types/portfolio'
import PortfolioAssetApi from '@api/PortfolioAssetApi'

export default abstract class PortfolioAssetAdapter {
  public static async getAsset(id: string): Promise<TPortfolioAsset> {
    return PortfolioAssetApi.getAsset(id)
  }

  public static async createAsset(data: TAssetFormDTO): Promise<boolean> {
    const request = await PortfolioAssetApi.createAsset(data)
    return request.success
  }

  public static async updateAsset(id: string, data: TAssetFormDTO): Promise<boolean> {
    const request = await PortfolioAssetApi.updateAsset(id, data)
    return request.success
  }

  public static async deleteAsset(id: string): Promise<boolean> {
    const request = await PortfolioAssetApi.deleteAsset(id)
    return request.success
  }
}
