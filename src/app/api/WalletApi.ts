import type { TWalletResponse } from '@types'
import Api from '@api/Api'

export default abstract class WalletApi {
  public static getUserWallet(): Promise<TWalletResponse> {
    return Api.get<TWalletResponse>('/wallets')
  }
}
