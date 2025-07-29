import type { ISession, TSessionValidateResponse } from '@types'
import SessionApi from '@api/SessionApi'

export default abstract class SessionAdapter {
  public static async createSession(): Promise<ISession | null> {
    return SessionApi.createSession()
  }

  public static async validateSession(): Promise<TSessionValidateResponse> {
    return SessionApi.validateSession()
  }

  public static async oAuthActivate(oauthKey: string): Promise<ISession | null> {
    return SessionApi.oAuthActivate(oauthKey)
  }

  public static async getSession(): Promise<ISession | null> {
    return SessionApi.getSession()
  }
}
