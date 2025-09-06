import type { ILoginDTO, IRegisterDTO } from '@types'
import type { IBooleanResponse } from '~/@types/api'
import Api from '@api/Api'

export default abstract class AuthApi {
  public static getAuthenticatedUser(): Promise<any> {
    return Api.get<any>('/auth/user')
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
