export interface IUser {
  id: string
  name: string | null
  username: string
  avatar: string
  level: number
  xp_points: number
  last_activity: string
  leveling: IUserLeveling
  status: {
    text: string
    color: string
  }
}
