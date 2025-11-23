// User base types for the ShramSaathi job marketplace

export type UserType = "worker" | "employer" | "admin"

export interface User {
  id: number
  phone: string
  userType: UserType
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  token?: string
  userType?: UserType
  userId?: number
  phone?: string
}
