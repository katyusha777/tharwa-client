import type { TSessionResponse, TSessionValidateResponse } from '@types'
import Api from '@api/Api'

export default abstract class SessionApi {
  public static createSession(): Promise<TSessionResponse> {
    return Api.post<TSessionResponse>('/sessions/create', {}, true)
  }

  public static validateSession(): Promise<TSessionValidateResponse> {
    return Api.get<TSessionValidateResponse>('/sessions/validate')
  }

  public static oAuthActivate(oauthKey: string): Promise<TSessionResponse> {
    return Api.post<TSessionResponse>('/sessions/oauth-activate', { oauth_key: oauthKey }, true)
  }

  public static getSession(): Promise<TSessionResponse> {
    return Api.get<TSessionResponse>('/sessions/create')
  }
}
