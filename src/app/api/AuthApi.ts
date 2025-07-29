import type { ILoginDTO, IRegisterDTO } from '@types'
import type { IBooleanResponse, TGetUserResponse } from '~/@types/api'
import Api from '@api/Api'

export default abstract class AuthApi {
  public static getAuthenticatedUser(): Promise<TGetUserResponse> {
    return Api.get<TGetUserResponse>('/auth/user')
  }

  public static getSteamLoginUrl(referralCode: string | null = null): Promise<string> {
    return Api.get<string>(`/auth/steam${referralCode ? `?referral_code=${referralCode}` : ''}`)
  }

  public static login(data: ILoginDTO): Promise<IBooleanResponse> {
    return Api.post<IBooleanResponse>('/auth/login', data)
  }

  public static register(data: IRegisterDTO): Promise<IBooleanResponse> {
    return Api.post<IBooleanResponse>('/auth/register', data)
  }

  public static logout(): Promise<IBooleanResponse> {
    return Api.get<IBooleanResponse>('/auth/logout')
  }

  public static requestPasswordReset(email: string): Promise<IBooleanResponse> {
    return Api.post<IBooleanResponse>('/auth/request-password-reset', { email })
  }

  public static confirmPasswordReset(code: string, password: string): Promise<IBooleanResponse> {
    return Api.post<IBooleanResponse>('/auth/confirm-password-reset', { code, password })
  }
}
