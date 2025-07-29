import type {
  IUserMissionRankings,
  IUserPlayHistory,
  IUserStats,
  IUserSteamInfo,
  IUserTransactionHistory,
  UserEditDTO,
} from '@types'
import type { IReferralCode } from '~/@types/referrals'
import UserApi from '@api/UserApi'

export default abstract class UserAdapter {
  public static async updateUser(data: UserEditDTO): Promise<boolean> {
    const response = await UserApi.updateUser(data)
    return response.success
  }

  // public static async getAvailableTitles(): Promise<IUserTitle> {
  //
  // }

  public static async updatePassword(password: string): Promise<boolean> {
    const response = await UserApi.updatePassword(password)
    return response.success
  }

  public static async updateEmail(email: string): Promise<boolean> {
    const response = await UserApi.updateEmail(email)
    return response.success
  }

  public static async getReferralCode(): Promise<IReferralCode | null> {
    return UserApi.getReferralCode()
  }

  public static async updateReferralCode(code: string): Promise<boolean> {
    const response = await UserApi.updateReferralCode(code)
    return response.success
  }

  public static async isSteamInfoValid(): Promise<boolean> {
    const steamInfo = await this.getSteamInfo()
    return !!steamInfo.steam_trade_url
  }

  public static async getUserStats(): Promise<IUserStats> {
    return UserApi.getUserStats()
  }

  public static async getUserMissionRankings(): Promise<IUserMissionRankings> {
    return UserApi.getUserMissionRankings()
  }

  public static async uploadUserAvatar(data: FormData): Promise<boolean> {
    const response = await UserApi.updateAvatar(data)
    return response.success
  }

  public static async getSteamInfo(): Promise<IUserSteamInfo> {
    return UserApi.getSteamInfo()
  }

  public static async updateSteamInfo(data: IUserSteamInfo): Promise<boolean> {
    const response = await UserApi.updateSteamInfo(data)
    return response.success
  }

  public static async getPlayHistory(): Promise<IUserPlayHistory> {
    return UserApi.getPlayHistory()
  }

  public static async getTransactionHistory(): Promise<IUserTransactionHistory> {
    return UserApi.getTransactionHistory()
  }
}
