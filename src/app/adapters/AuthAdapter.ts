import type { IAuthenticatedUser, ILoginDTO, IRegisterDTO } from '@types'
import AuthApi from '@api/AuthApi'

export default abstract class AuthAdapter {
  public static async getAuthenticatedUser(): Promise<IAuthenticatedUser | null> {
    return AuthApi.getAuthenticatedUser()
  }

  public static async getSteamLoginUrl(referralCode: string | null = null): Promise<string> {
    return AuthApi.getSteamLoginUrl(referralCode)
  }

  public static async login(data: ILoginDTO): Promise<boolean> {
    const request = await AuthApi.login(data)
    return request.success
  }

  public static async register(data: IRegisterDTO): Promise<boolean> {
    const request = await AuthApi.register(data)
    return request.success
  }

  public static async logout(): Promise<boolean> {
    const request = await AuthApi.logout()
    return request.success
  }

  public static async requestPasswordReset(email: string): Promise<boolean> {
    const request = await AuthApi.requestPasswordReset(email)
    return request.success
  }

  public static async confirmPasswordReset(code: string, password: string): Promise<boolean> {
    const request = await AuthApi.confirmPasswordReset(code, password)
    return request.success
  }
}
