import type { IAuthenticatedUser, ILoginDTO, IRegisterDTO } from '@types'
import AuthAdapter from '@adapters/AuthAdapter'
import StoresHelper from '@helpers/StoresHelper'
import { defineStore } from 'pinia'
import SessionService from '~/app/services/SessionService'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticatedUser: null as IAuthenticatedUser | null,
      isLoggedIn: false,
    }
  },

  getters: {
  },

  actions: {

    async loadUser(): Promise<void> {
      if (!SessionService.session)
        return

      try {
        this.authenticatedUser = await AuthAdapter.getAuthenticatedUser()
        this.isLoggedIn = !!this.authenticatedUser
      }
      catch (e: any) {
        this.authenticatedUser = null
      }
    },

    async logout(): Promise<void> {
      await AuthAdapter.logout()
      this.authenticatedUser = null
      this.isLoggedIn = false
      window.location.href = '/'
    },

    async sendPasswordReset(email: string): Promise<void> {
      await AuthAdapter.requestPasswordReset(email)
    },

    async resetPassword(code: string, password: string): Promise<void> {
      const res = await AuthAdapter.confirmPasswordReset(code, password)
      if (res) {
        // showNotify({ type: 'success', message: t('notify.password_reset_success') })
        // showSuccessToast(t('notify.success'))
        await this.loadUser()
      }
      else {
        // showNotify({ type: 'danger', message: t('notify.request_failed') })
      }
    },

    async  login(data: ILoginDTO): Promise<void> {
      const res = await AuthAdapter.login(data)
      if (res) {
        // showToast({
        //   title: 'success',
        //   message: 'Authentication success.',
        //   type: 'success',
        //   duration: 5000,
        // })
        await StoresHelper.initialiseStores()
      }
      else {
        // showToast({
        //   title: 'Whoops',
        //   message: 'Incorrect Email or Password',
        //   type: 'error',
        //   duration: 5000,
        // })
        throw new Error('Authentication failed')
      }
    },

    async  register(data: IRegisterDTO): Promise<void> {
      const res = await AuthAdapter.register(data)
      if (res) {
        // showNotify({ type: 'success', message: t('notify.authentication_success') })
        await StoresHelper.initialiseStores()
      }
      else {
        // showNotify({ type: 'danger', message: t('notify.authentication_failed') })
      }
    },
  },
})
