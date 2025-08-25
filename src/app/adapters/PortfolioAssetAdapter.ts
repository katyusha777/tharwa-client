import type { IAssetFormDTO, IPortfolioAsset } from '~/@types/portfolio'
import PortfolioAssetApi from '@api/PortfolioAssetApi'

export default abstract class PortfolioAssetAdapter {
  public static async getAsset(id: string): Promise<IPortfolioAsset> {
    return PortfolioAssetApi.getAsset(id)
  }

  public static async createAsset(data: IAssetFormDTO): Promise<boolean> {
    const request = await PortfolioAssetApi.createAsset(data)
    return request.success
  }

  public static async updateAsset(id: string, amount: number): Promise<boolean> {
    const request = await PortfolioAssetApi.updateAsset(id, amount)
    return request.success
  }

  public static async deleteAsset(id: string): Promise<boolean> {
    const request = await PortfolioAssetApi.deleteAsset(id)
    return request.success
  }
}
