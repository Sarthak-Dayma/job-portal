// Data models and types for ShramSaathi

export type UserRole = "worker" | "employer" | "admin"

export interface User {
  id: string
  phone: string
  role: UserRole
  name?: string
  email?: string
  createdAt: Date
  updatedAt: Date
}

export interface Worker extends User {
  role: "worker"
  skills: string[]
  bio?: string
  avatar?: string
  rating: number
  totalJobs: number
  verified: boolean
  documents?: WorkerDocument[]
}

export interface WorkerDocument {
  id: string
  workerId: string
  type: "aadhaar" | "pancard" | "bankaccount" | "other"
  url: string
  verified: boolean
  verifiedAt?: Date
}

export interface Employer extends User {
  role: "employer"
  companyName: string
  description?: string
  logo?: string
  verified: boolean
  rating: number
  totalJobsPosted: number
}

export interface Admin extends User {
  role: "admin"
  permissions: string[]
}

export interface Job {
  id: string
  employerId: string
  title: string
  description: string
  category: string
  skills: string[]
  location: string
  latitude?: number
  longitude?: number
  wage: {
    amount: number
    currency: string
    period: "hourly" | "daily" | "weekly" | "fixed"
  }
  startDate: Date
  endDate?: Date
  status: "active" | "filled" | "completed" | "cancelled"
  applicants: number
  createdAt: Date
  updatedAt: Date
}

export interface JobApplication {
  id: string
  jobId: string
  workerId: string
  status: "applied" | "accepted" | "rejected" | "completed"
  appliedAt: Date
  respondedAt?: Date
  completedAt?: Date
}

export interface AuthResponse {
  token: string
  user: User
}

export interface OtpResponse {
  otpToken: string
  expiresIn: number
}

export interface JobMatch {
  jobId: string
  matchScore: number
  reasons: string[]
}

export interface WorkerMatch {
  workerId: string
  matchScore: number
  reasons: string[]
}
