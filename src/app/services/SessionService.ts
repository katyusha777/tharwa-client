import type { ISession } from '@types'
import SessionAdapter from '~/app/adapters/SessionAdapter'
import SessionError from '~/app/errors/SessionError'

export default abstract class SessionService {
  protected static localStorageKey = 's'

  /**
   * This presumes the session has already been initialised
   */
  public static get session(): ISession {
    if (import.meta.env.SSR)
      return { key: '' }

    const storageSession = this.getSession()

    if (!storageSession)
      throw new SessionError('Session not found in localStorage')

    return storageSession
  }

  public static async initialiseSession(): Promise<boolean> {
    if (typeof window === 'undefined' || import.meta.env.SSR)
      return false

    // const queryString = window.location.search
    // const urlParams = new URLSearchParams(queryString)
    // const oAuthKey = urlParams.get('oauth_key')
    // if (oAuthKey) {
    //   await this.loadOAuthSession(oAuthKey)
    //   return
    // }

    let session = this.getSession()

    /**
     * If there is a session AND it is valid, we return,
     * meaning, no need to create/load a new session
     */
    if (session) {
      const isValid = await this.validateSession()
      if (isValid)
        return true
    }

    session = await this.loadNewSession()

    if (session) {
      this.saveSession(session)
      return true
    }

    return false
  }

  protected static async validateSession(): Promise<boolean> {
    const sessionValidation = await SessionAdapter.validateSession()
    return sessionValidation.is_valid
  }

  protected static async loadOAuthSession(oAuthKey: string): Promise<void> {
    const oAuthSession: ISession | null = await SessionAdapter.oAuthActivate(oAuthKey)
    if (oAuthSession)
      this.saveSession(oAuthSession)
  }

  protected static async loadNewSession(): Promise<ISession | null> {
    const session = await SessionAdapter.createSession()

    if (!session && typeof window !== 'undefined')
      throw new SessionError('Could not create session')

    return session
  }

  protected static getSession(): ISession | null {
    if (typeof localStorage === 'undefined')
      return null

    const stored = localStorage.getItem(this.localStorageKey)
    return stored ? JSON.parse(stored) : null
  }

  protected static saveSession(session: ISession): void {
    if (typeof localStorage === 'undefined')
      return

    localStorage.setItem(this.localStorageKey, JSON.stringify(session))
  }
}
