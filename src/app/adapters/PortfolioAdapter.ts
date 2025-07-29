import type { IPortfolio } from '~/@types/portfolio'
import PortfolioApi from '@api/PortfolioApi'

export default abstract class PortfolioAdapter {
  public static async getDefaultPortfolio(): Promise<IPortfolio> {
    return PortfolioApi.getDefaultPortfolio()
  }
}
