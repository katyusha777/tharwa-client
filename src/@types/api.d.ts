interface IBaseApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface IBooleanResponse {
  success: boolean
  message?: string
}
