import type { IUser } from '~/@types/user'

export interface ISession {
  key: string
  customer?: IUser
}
