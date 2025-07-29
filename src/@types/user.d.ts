export type TUserHistoryRowType = 'box_purchase' | 'hilo' | 'pvp_unboxing' | 'upgrader'

export interface IUserLeveling {
  level: number
  nextLevel: number
  currentLevelXpThreshold: number
  nextLevelXpThreshold: number
  xpRequiredForNextLevel: number
  percentageToNextLevel: number
  xp: number
  color: string
}

export interface IWallet {
  balance: number
}

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

export interface UserEditDTO {
  name: string
  email: string
  username: string
  password: string
  steam_username: string
  discord_username: string
}

export interface IUserTitle {
  id: string
  name: string
}

export interface IUserSteamInfo {
  steam_trade_url: string | null
}

export interface IUserStats {
  bestUnboxedItem: IBoxItem | null
  bestDailyReward: IBoxItem | null
  luckiestCase: IBox | null
  caseBattlesWon: number
  caseBattlesPlayed: number
}

export interface IUserMissionRankings {
  firstPlaceCount: number
  secondPlaceCount: number
  thirdPlaceCount: number
}

export interface IAuthenticatedUser extends IUser {
  email: string
  name: string
  echo_key: string
  steam_username: string
  discord_username: string
}

export interface IBoxPurchaseHistoryItemDTO {
  type: 'box_purchase'
  unboxingId: string
  timestamp: string
  images: string[]
  is_won: boolean | null
  net_winnings: number
  sum_winnings: number
}

export interface IHiLoHistoryItemDTO {
  type: 'hilo'
  gameId: string
  timestamp: string
  guess: string
  images: string[]
  is_won: boolean | null
  is_void: boolean
  net_winnings: number
  sum_winnings: number
}

export interface IPvpUnboxingHistoryItemDTO {
  type: 'pvp_unboxing'
  gameId: string
  timestamp: string
  mode: string
  is_won: boolean | null
  net_winnings: number
  sum_winnings: number
  images: string[]
}

export interface IUpgradeHistoryItemDTO {
  type: 'upgrader'
  upgradingId: string
  timestamp: string
  images: string[]
  is_won: boolean | null
  net_winnings: number
  sum_winnings: number
}

export type TUserHistoryItem = IBoxPurchaseHistoryItemDTO | IHiLoHistoryItemDTO | IPvpUnboxingHistoryItemDTO | IUpgradeHistoryItemDTO

export interface IUserPlayHistory {
  history: Array<TUserHistoryItem>
  total_winnings: number
}

export type TTransactionHistoryType = 'wallet_deposit' | 'skin_deposit' | 'skin_withdraw'

export interface ITransactionHistoryItemDTO {
  id: string
  type: TTransactionHistoryType
  timestamp: string
  provider: string
  status: string
  value: number
  currency_value?: number | null
  title?: string | null
}

export interface IUserTransactionHistory {
  history: Array<ITransactionHistoryItemDTO>
  total_winnings: number
}
