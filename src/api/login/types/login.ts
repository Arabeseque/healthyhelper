export interface LoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export interface LoginResponseData {
  code: number
  token: string
  msg: string
}

export type UserInfoResponseData = ApiResponseData<{ name: string; type: string; username: string }>
