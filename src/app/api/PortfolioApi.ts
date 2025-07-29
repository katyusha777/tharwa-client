import type { IPortfolio } from '~/@types/portfolio'
import Api from '@api/Api'

export default abstract class PortfolioApi {
  public static getDefaultPortfolio(): Promise<IPortfolio> {
    return Api.get<IPortfolio>('/portfolio/default')
  }
}
