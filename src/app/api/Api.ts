import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { showToast } from '@helpers/showCustomToast'
import axios from 'axios'
import SessionService from '~/app/services/SessionService'
import config from '~/config'

// const { getSessionId } = useSession()

export default abstract class Api {
  public static async get<T>(path: string, withoutSession: boolean = false): Promise<T> {
    return this.remoteRequest('get', path, undefined, withoutSession)
  }

  public static async delete<T>(path: string): Promise<T> {
    return this.remoteRequest('delete', path)
  }

  public static async post<T>(path: string, data: object | Array<object> = {}, withoutSession: boolean = false): Promise<T> {
    return this.remoteRequest('post', path, data, withoutSession)
  }

  public static async put<T>(path: string, data: object | Array<object> = {}, withoutSession: boolean = false): Promise<T> {
    return this.remoteRequest('put', path, data, withoutSession)
  }

  protected static createUrl(path: string): string {
    return `${config.api.url}${path}`
  }

  private static async remoteRequest<T>(method: 'post' | 'get' | 'delete' | 'put', path: string, data?: object | Array<object>, withoutSession: boolean = false): Promise<T> {
    if (typeof localStorage === 'undefined')
      return null as T

    let session
    try {
      session = withoutSession ? null : SessionService.session
    }
    catch (_e: any) {
      session = null
    }

    if (!withoutSession && !session) {
      throw new Error(`No session for request to: ${path}`)
    }

    const requestConfig: AxiosRequestConfig = {
      url: this.createUrl(path),
      method,
      headers: { 'session-key': withoutSession ? null : session!.key },
      ...((method === 'post' || method === 'put') && { data }),
    }

    try {
      const response: AxiosResponse<T> = await axios(requestConfig)
      const data = response.data

      const apiResult = data as { success?: boolean, message?: string }
      if (apiResult.success === false) {
        // showToast({ title: 'API error', message: apiResult.message ?? 'HTTP Error', type: 'error', duration: 5000 })
      }

      return data
    }
    catch (error: any) {
      // showToast({ title: 'API error', message: error.response.data.message ?? 'HTTP Error', type: 'error', duration: 5000 })
      console.error('Error in remoteRequest:', error)

      throw error
    }
  }
}
