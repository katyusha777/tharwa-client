import { useAuthStore } from '~/stores/auth'

export default abstract class StoresHelper {
  public static async initialiseStores(): Promise<void> {
    const { loadUser } = useAuthStore()

    await loadUser()

    // const authenticatedUser: IUser | null = useAuthStore().authenticatedUser
    // if (!authenticatedUser)
    //   return
  }
}
