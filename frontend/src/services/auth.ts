import apiClient from './http'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  [key: string]: unknown
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type RegisterResponse = Record<string, unknown>

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
  return data
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<RegisterResponse>('/auth/register', payload)
  return data
}
