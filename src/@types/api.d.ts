import type { IInventoryItem } from '~/@types/boxes'
import type { IItemUpgradeResult } from '~/@types/boxes'
import type { IBox, IBoxItem, IItemUpgradeCalculation, IPurchasedBox, IPvpUnboxing } from '~/@types/boxes'
import type { IInventoryBox } from '~/@types/boxes'
import type { IChatMessage } from '~/@types/chat'
import type { ICheckoutDTO, IPayment } from '~/@types/depositing'
import type { IDiceGame } from '~/@types/dicegame'
import type { IHigherLowerBet } from '~/@types/higherLower'
import type { IHigherLowerPlayResult } from '~/@types/higherLower'
import type { ICompetitiveMission, TPersonalMissionData } from '~/@types/missions'
import type { TCompetitiveMissionData } from '~/@types/missions'
import type { IRouletteGame } from '~/@types/roulette'
import type { IRouletteGameStats } from '~/@types/roulette'
import type { ISession } from '~/@types/session'
import type { IMarketplaceSkin } from '~/@types/skins'
import type { ITeam } from '~/@types/teams'
import type { IAuthenticatedUser, IWallet } from '~/@types/user'
import type { IUserPlayHistory } from '~/@types/user'
import type { IUserTransactionHistory } from '~/@types/user'

interface IBaseApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface IBooleanResponse {
  success: boolean
  message?: string
}

interface PaginationResult<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type TNullableTeamResponse = ITeam | null

// Boxes and PvP unboxing
export type TGetPvpUnboxingList = Array<IPvpUnboxing>
export type TGetPvpUnboxingGame = IPvpUnboxing
export type TGetBoxesResponse = Array<IBox>
export type TGetInventoryBoxesResponse = Array<IInventoryBox>
export type TGetRewardBoxesClaimedResponse = Record<string, string>
export type TGetBoxResponse = IBox
export type TGetBoxItemsResponse = Array<IBoxItem>
export type TPurchasedBoxesResponse = Array<IPurchasedBox>

// User and wallet
export interface TSessionValidateResponse { is_valid: boolean }
export type TSessionResponse = ISession | null
export type TGetUserResponse = IAuthenticatedUser | null
export type TWalletResponse = IWallet | null
export type TUserPlayHistoryResponse = IUserPlayHistory
export type TUserTransactionHistoryResponse = IUserTransactionHistory

// Depositing
export type TCheckoutResponse = ICheckoutDTO
export type TGetPaymentResponse = IPayment

// Chat
export type TGetChatMessagesResponse = Array<IChatMessage>

// Roulette
export type TGetRouletteStatsResponse = Array<IRouletteGameStats>
export type TGetRouletteGameResponse = IRouletteGame

// Inventory and items
export type TInventoryResponse = Array<IInventoryItem>
export type TItemUpgradeCalculationResponse = IItemUpgradeCalculation
export type TItemUpgradeResponse = IItemUpgradeResult

// Skins
export type TSkinsMarketplaceResponse = PaginationResult<IMarketplaceSkin>

// Dice game
export type THigherLowerBetResponse = IHigherLowerBet
export type THigherLowerBetPlayResponse = IHigherLowerPlayResult

// Dice game
export type TCreateDiceGameResponse = IDiceGame
export type TGetDiceGameResponse = IDiceGame
export type TGetPlayableDiceGameResponse = Array<IDiceGame>

// Missions
export type TListCompetitiveMissionsResponse = Array<ICompetitiveMission>
export type TListPersonalMissionsResponse = Array<TPersonalMissionData>
export type TGetCompetitiveMissionResponse = TCompetitiveMissionData
export type TGetPersonalMissionResponse = TPersonalMissionData
